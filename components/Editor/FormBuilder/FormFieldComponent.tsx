// frontend/src/components/Editor/FormBuilder/FormFieldComponent.tsx
import { FormField } from '@/types';

interface FormFieldComponentProps {
  field: FormField;
  onDelete: () => void;
}

export default function FormFieldComponent({ field, onDelete }: FormFieldComponentProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <span className="material-icons text-gray-400 mr-2">
            {field.type === 'text' ? 'text_fields' :
             field.type === 'email' ? 'email' : 'numbers'}
          </span>
          <span className="font-medium">{field.label}</span>
        </div>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
        >
          <span className="material-icons">delete</span>
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="material-icons text-sm mr-1">info</span>
          Type: {field.type}
        </div>
        {field.required && (
          <div className="flex items-center text-sm text-blue-600">
            <span className="material-icons text-sm mr-1">check_circle</span>
            Required field
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {field.required && '*'}
        </label>
        <input
          type={field.type}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          disabled
          className="block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
    </div>
  );
}