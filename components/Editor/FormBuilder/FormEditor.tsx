// frontend/src/components/Editor/FormBuilder/FormEditor.tsx
import { useState } from 'react';
import { FormField } from '@/types';

interface FormEditorProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

export default function FormEditor({ fields, onChange }: FormEditorProps) {
  const [editingField, setEditingField] = useState<FormField | null>(null);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      required: false,
    };
    onChange([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    const updatedFields = fields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    );
    onChange(updatedFields);
  };

  const deleteField = (id: string) => {
    onChange(fields.filter(field => field.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={() => addField('text')}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Add Text
        </button>
        <button
          onClick={() => addField('email')}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Add Email
        </button>
        <button
          onClick={() => addField('number')}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Add Number
        </button>
      </div>

      {fields.map(field => (
        <div
          key={field.id}
          className="p-4 border rounded-lg bg-white"
        >
          <div className="flex justify-between items-start mb-2">
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              className="text-lg font-medium bg-transparent border-none p-0"
            />
            <button
              onClick={() => deleteField(field.id)}
              className="text-red-500 hover:text-red-700"
            >
              <span className="material-icons">delete</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => 
                  updateField(field.id, { required: e.target.checked })
                }
                className="mr-2"
              />
              Required field
            </label>

            {/* Field preview */}
            <div className="mt-2 p-2 bg-gray-50 rounded">
              <label className="block text-sm font-medium text-gray-700">
                {field.label} {field.required && '*'}
              </label>
              <input
                type={field.type}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}