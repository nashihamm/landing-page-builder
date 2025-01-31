// app/components/Editor/PropertiesPanel.tsx
'use client';

import { useEditor } from '@/app/contexts/EditorContext';

export default function PropertiesPanel() {
  const { state, dispatch } = useEditor();
  const component = state.selectedComponent;

  if (!component) {
    return (
      <div className="w-64 bg-gray-50 border-l p-4">
        <p className="text-gray-500 text-sm text-center">
          Select a component to edit its properties
        </p>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<typeof component>) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: { id: component.id, updates },
    });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_COMPONENT', payload: component.id });
  };

  return (
    <div className="w-64 bg-gray-50 border-l overflow-y-auto">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{component.type} Properties</h3>
          <button
            onClick={handleDelete}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <span className="material-icons text-sm">delete</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Content properties */}
        {component.type === 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Content
            </label>
            <textarea
              value={component.content.text}
              onChange={(e) =>
                handleUpdate({
                  content: { ...component.content, text: e.target.value },
                })
              }
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
        )}

        {/* Style properties */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <input
            type="text"
            value={component.style.fontSize || '16px'}
            onChange={(e) =>
              handleUpdate({
                style: { ...component.style, fontSize: e.target.value },
              })
            }
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <input
            type="color"
            value={component.style.color || '#000000'}
            onChange={(e) =>
              handleUpdate({
                style: { ...component.style, color: e.target.value },
              })
            }
            className="w-full"
          />
        </div>

        {/* Add more style properties as needed */}
      </div>
    </div>
  );
}