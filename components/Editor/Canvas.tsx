// frontend/src/components/Editor/Canvas.tsx
import { useDroppable } from '@dnd-kit/core';
import { Component } from '@/types';
import { useEditor } from '@/app/contexts/EditorContext';

interface CanvasProps {
  components: Component[];
}

export default function Canvas({ components }: CanvasProps) {
  const { state, dispatch } = useEditor();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const handleComponentClick = (component: Component) => {
    dispatch({ type: 'SELECT_COMPONENT', payload: component });
  };

  return (
    <div
      ref={setNodeRef}
      className="flex-1 bg-gray-100 p-8 overflow-auto"
      style={{ zoom: `${state.zoom}%` }}
    >
      <div className="bg-white min-h-[calc(100vh-4rem)] shadow-sm rounded-lg p-8">
        {components.map((component) => (
          <DroppedComponent
            key={component.id}
            component={component}
            onClick={() => handleComponentClick(component)}
            isSelected={state.selectedComponent?.id === component.id}
          />
        ))}
      </div>
    </div>
  );
}

interface DroppedComponentProps {
  component: Component;
  onClick: () => void;
  isSelected: boolean;
}

function DroppedComponent({ component, onClick, isSelected }: DroppedComponentProps) {
  const componentStyle = {
    ...component.style,
    outline: isSelected ? '2px solid #3b82f6' : 'none',
  };

  switch (component.type) {
    case 'container':
      return (
        <div
          onClick={onClick}
          style={componentStyle}
          className="p-4 border rounded-lg min-h-[100px]"
        >
          {component.children?.map((child) => (
            <DroppedComponent
              key={child.id}
              component={child}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              isSelected={isSelected}
            />
          ))}
        </div>
      );

    case 'text':
      return (
        <div
          onClick={onClick}
          style={componentStyle}
          className="p-2"
          contentEditable={isSelected}
          suppressContentEditableWarning
        >
          {component.content.text}
        </div>
      );

    case 'image':
      return (
        <div onClick={onClick} style={componentStyle}>
          <img
            src={component.content.src}
            alt={component.content.alt}
            className="max-w-full h-auto"
          />
        </div>
      );

    case 'button':
      return (
        <button
          onClick={onClick}
          style={componentStyle}
          className="px-4 py-2 rounded"
        >
          {component.content.text}
        </button>
      );

    case 'form':
      return (
        <div onClick={onClick} style={componentStyle}>
          <FormComponent fields={component.content.fields} />
        </div>
      );

    default:
      return null;
  }
}