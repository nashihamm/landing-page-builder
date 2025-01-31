// frontend/src/components/Editor/ComponentLibrary.tsx
import { useDraggable } from '@dnd-kit/core';
import { ComponentType } from '@/types';

interface ComponentItemProps {
  type: ComponentType;
  label: string;
  icon: string;
}

function ComponentItem({ type, label, icon }: ComponentItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `new-${type}`,
    data: {
      type,
      isNew: true,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="flex items-center p-3 bg-white rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow"
    >
      <span className="material-icons mr-2">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default function ComponentLibrary() {
  const components = [
    { type: 'container', label: 'Container', icon: 'dashboard' },
    { type: 'text', label: 'Text', icon: 'text_fields' },
    { type: 'image', label: 'Image', icon: 'image' },
    { type: 'button', label: 'Button', icon: 'smart_button' },
    { type: 'form', label: 'Form', icon: 'dynamic_form' },
  ];

  return (
    <div className="w-64 bg-gray-50 p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="space-y-3">
        {components.map((component) => (
          <ComponentItem key={component.type} {...component} />
        ))}
      </div>
    </div>
  );
}