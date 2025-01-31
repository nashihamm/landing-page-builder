// app/components/Editor/EditorCanvas.tsx
'use client';

import { useDroppable } from '@dnd-kit/core';
import { useEditor } from '@/app/contexts/EditorContext';
import { Component } from '@/app/types';

interface EditorCanvasProps {
  components: Component[];
}

export default function EditorCanvas({ components }: EditorCanvasProps) {
  const { state } = useEditor();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const canvasStyle = {
    zoom: `${state.zoom}%`,
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <div
        ref={setNodeRef}
        className="min-h-screen p-8"
        style={canvasStyle}
      >
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-8 min-h-[calc(100vh-8rem)]">
          {components.map((component) => (
            <DroppedComponent
              key={component.id}
              component={component}
              isSelected={state.selectedComponent?.id === component.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface DroppedComponentProps {
  component: Component;
  isSelected: boolean;
}

function DroppedComponent({ component, isSelected }: DroppedComponentProps) {
  const { dispatch } = useEditor();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SELECT_COMPONENT', payload: component });
  };

  const componentStyle = {
    ...component.style,
    outline: isSelected ? '2px solid #3b82f6' : 'none',
  };

  return (
    <div
      onClick={handleClick}
      style={componentStyle}
      className="relative group"
    >
      {isSelected && (
        <div className="absolute -top-4 right-0 flex space-x-1">
          <button className="p-1 bg-white rounded shadow text-gray-600 hover:text-gray-900">
            <span className="material-icons text-sm">content_copy</span>
          </button>
          <button className="p-1 bg-white rounded shadow text-red-600 hover:text-red-700">
            <span className="material-icons text-sm">delete</span>
          </button>
        </div>
      )}
      
      <ComponentRenderer component={component} />
    </div>
  );
}

function ComponentRenderer({ component }: { component: Component }) {
  switch (component.type) {
    case 'text':
      return <p>{component.content.text}</p>;
    case 'heading':
      return <h2 className="text-2xl font-bold">{component.content.text}</h2>;
    case 'image':
      return (
        <img
          src={component.content.src}
          alt={component.content.alt}
          className="max-w-full h-auto"
        />
      );
    case 'button':
      return (
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          {component.content.text}
        </button>
      );
    // Add more component types here
    default:
      return null;
  }
}