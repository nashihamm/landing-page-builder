// frontend/src/components/Templates/TemplateLibrary.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Page } from '@/types';

export default function TemplateLibrary() {
  const [templates, setTemplates] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('/api/templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateSelect = async (template: Page) => {
    try {
      const response = await axios.post('/api/pages', {
        name: `${template.name} Copy`,
        components: template.components,
        subdomain: `${template.subdomain}-${Date.now()}`,
      });

      // Navigate to editor with new page
      window.location.href = `/editor/${response.data.id}`;
    } catch (error) {
      console.error('Error creating page from template:', error);
    }
  };

  if (loading) {
    return <div>Loading templates...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="aspect-video bg-gray-100">
            {/* Template preview image would go here */}
          </div>
          <div className="p-4">
            <h3 className="font-medium">{template.name}</h3>
            <button
              onClick={() => handleTemplateSelect(template)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Use Template
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}