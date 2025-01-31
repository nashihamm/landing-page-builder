// app/components/Editor/AdvancedToolbar.tsx
'use client';

import { useState } from 'react';
import { useEditor } from '@/app/contexts/EditorContext';

export default function AdvancedToolbar({ onSave, saving }: { onSave: () => void, saving: boolean }) {
  const { state, dispatch } = useEditor();
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleZoomChange = (zoom: number) => {
    dispatch({ type: 'SET_ZOOM', payload: zoom });
  };

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        {/* Device Preview */}
        <div className="border rounded-lg p-1 flex space-x-1 bg-gray-50">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-1 rounded ${viewMode === 'desktop' ? 'bg-white shadow' : ''}`}
          >
            <span className="material-icons text-gray-600">desktop_windows</span>
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-1 rounded ${viewMode === 'tablet' ? 'bg-white shadow' : ''}`}
          >
            <span className="material-icons text-gray-600">tablet_mac</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1 rounded ${viewMode === 'mobile' ? 'bg-white shadow' : ''}`}
          >
            <span className="material-icons text-gray-600">smartphone</span>
          </button>
        </div>

        {/* Zoom Control */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleZoomChange(state.zoom - 10)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <span className="material-icons text-gray-600">remove</span>
          </button>
          <span className="text-sm text-gray-600 w-16 text-center">
            {state.zoom}%
          </span>
          <button
            onClick={() => handleZoomChange(state.zoom + 10)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <span className="material-icons text-gray-600">add</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Undo/Redo */}
        <div className="border rounded-lg p-1 flex space-x-1 bg-gray-50">
          <button
            onClick={() => dispatch({ type: 'UNDO' })}
            className="p-1 rounded hover:bg-white hover:shadow"
          >
            <span className="material-icons text-gray-600">undo</span>
          </button>
          <button
            onClick={() => dispatch({ type: 'REDO' })}
            className="p-1 rounded hover:bg-white hover:shadow"
          >
            <span className="material-icons text-gray-600">redo</span>
          </button>
        </div>

        {/* Save/Publish */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}