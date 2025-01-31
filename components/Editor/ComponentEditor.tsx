// frontend/src/components/Editor/ComponentEditor.tsx
import { useState } from 'react';
import { Component } from '@/types';

interface ComponentEditorProps {
  component: Component;
  onUpdate: (updatedComponent: Component) => void;
}

export default function ComponentEditor({ component, onUpdate }: ComponentEditorProps) {
  const [style, setStyle] = useState(component.style);

  const handleStyleChange = (property: string, value: string) => {
    const updatedStyle = { ...style, [property]: value };
    setStyle(updatedStyle);
    onUpdate({ ...component, style: updatedStyle });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Edit {component.type}</h3>
      
      <div className="space-y-4">
        {/* Style Controls */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Padding
          </label>
          <input
            type="number"
            value={parseInt(style.padding || '0')}
            onChange={(e) => handleStyleChange('padding', `${e.target.value}px`)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Background Color
          </label>
          <input
            type="color"
            value={style.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {component.type === 'text' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Size
              </label>
              <input
                type="number"
                value={parseInt(style.fontSize || '16')}
                onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Text Color
              </label>
              <input
                type="color"
                value={style.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}