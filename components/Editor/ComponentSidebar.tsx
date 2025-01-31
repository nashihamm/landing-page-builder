// app/components/Editor/ComponentSidebar.tsx
'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

const componentCategories = [
  {
    name: 'Layout',
    components: [
      { type: 'section', icon: 'dashboard_customize', label: 'Section' },
      { type: 'container', icon: 'grid_view', label: 'Container' },
      { type: 'columns', icon: 'view_week', label: 'Columns' },
    ],
  },
  {
    name: 'Basic',
    components: [
      { type: 'text', icon: 'text_fields', label: 'Text' },
      { type: 'heading', icon: 'title', label: 'Heading' },
      { type: 'image', icon: 'image', label: 'Image' },
      { type: 'button', icon: 'smart_button', label: 'Button' },
    ],
  },
  {
    name: 'Forms',
    components: [
      { type: 'form', icon: 'dynamic_form', label: 'Form' },
      { type: 'input', icon: 'input', label: 'Input' },
      { type: 'textarea', icon: 'notes', label: 'Textarea' },
      { type: 'checkbox', icon: 'check_box', label: 'Checkbox' },
    ],
  },
  {
    name: 'Advanced',
    components: [
      { type: 'video', icon: 'play_circle', label: 'Video' },
      { type: 'carousel', icon: 'view_carousel', label: 'Carousel' },
      { type: 'map', icon: 'map', label: 'Map' },
      { type: 'social', icon: 'share', label: 'Social' },
    ],
  },
];

function DraggableComponent({ type, icon, label }: { type: string; icon: string; label: string }) {
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
      className="flex items-center p-3 bg-white rounded-lg shadow-sm cursor-move hover:bg-gray-50 transition-colors"
      style={style}
    >
      <span className="material-icons text-gray-600 mr-2">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default function ComponentSidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Layout');

  const filteredComponents = componentCategories
    .find(cat => cat.name === selectedCategory)
    ?.components.filter(comp =>
      comp.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="w-64 bg-gray-50 border-r h-full flex flex-col">
      <div className="p-4 border-b bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
          />
          <span className="material-icons absolute left-3 top-2 text-gray-400">
            search
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex space-x-1 p-2 bg-white border-b overflow-x-auto">
          {componentCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredComponents?.map((component) => (
            <DraggableComponent
              key={component.type}
              type={component.type}
              icon={component.icon}
              label={component.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}