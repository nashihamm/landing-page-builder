// frontend/src/components/FormBuilder/FormBuilder.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '@/types';

export default function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);
  const { register, handleSubmit } = useForm();

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      required: false,
      placeholder: '',
    };
    setFields([...fields, newField]);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="mb-4 space-x-2">
        <button
          onClick={() => addField('text')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Text Field
        </button>
        <button
          onClick={() => addField('email')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Email Field
        </button>
        <button
          onClick={() => addField('number')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Number Field
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <FormFieldComponent
            key={field.id}
            field={field}
            onDelete={() => {
              setFields(fields.filter((f) => f.id !== field.id));
            }}
          />
        ))}
      </div>
    </div>
  );
}