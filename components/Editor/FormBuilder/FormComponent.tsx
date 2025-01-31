// frontend/src/components/Editor/FormBuilder/FormComponent.tsx
import { FormField } from '@/types';

interface FormComponentProps {
  fields: FormField[];
  isEditing?: boolean;
}

export default function FormComponent({ fields, isEditing = false }: FormComponentProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      // Handle form submission
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      console.log('Form submitted:', data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <label
            htmlFor={field.id}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            required={field.required}
            disabled={isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        </div>
      ))}
      
      {!isEditing && fields.length > 0 && (
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      )}
    </form>
  );
}