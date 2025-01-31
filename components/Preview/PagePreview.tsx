// frontend/src/components/Preview/PagePreview.tsx
import { useEffect, useState } from 'react';
import { Page } from '@/types';

interface PagePreviewProps {
  page: Page;
}

export default function PagePreview({ page }: PagePreviewProps) {
  const [iframeHeight, setIframeHeight] = useState('0px');

  useEffect(() => {
    // Generate preview HTML
    const html = generatePreviewHTML(page);
    
    // Create blob and URL
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Clean up
    return () => URL.revokeObjectURL(url);
  }, [page]);

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <iframe
          src={`/api/preview/${page.id}`}
          className="w-full"
          style={{ height: iframeHeight }}
          onLoad={(e) => {
            const iframe = e.target as HTMLIFrameElement;
            if (iframe.contentWindow) {
              setIframeHeight(
                `${iframe.contentWindow.document.body.scrollHeight}px`
              );
            }
          }}
        />
      </div>
    </div>
  );
}

function generatePreviewHTML(page: Page): string {
  // Generate HTML string from page components
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${page.name}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>
        <div id="page-content">
          ${renderComponents(page.components)}
        </div>
      </body>
    </html>
  `;
}

function renderComponents(components: any[]): string {
  return components.map(component => {
    switch (component.type) {
      case 'text':
        return `<div style="${styleToString(component.style)}">${component.content.text}</div>`;
      case 'image':
        return `<img src="${component.content.src}" alt="${component.content.alt}" style="${styleToString(component.style)}">`;
      case 'button':
        return `<button style="${styleToString(component.style)}">${component.content.text}</button>`;
      case 'form':
        return renderForm(component);
      default:
        return '';
    }
  }).join('\n');
}

function styleToString(style: Record<string, string>): string {
  return Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
}

function renderForm(component: any): string {
  const fields = component.content.fields.map((field: FormField) => `
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        ${field.label} ${field.required ? '*' : ''}
      </label>
      <input
        type="${field.type}"
        name="${field.id}"
        ${field.required ? 'required' : ''}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
    </div>
  `).join('\n');

  return `
    <form class="w-full max-w-lg" style="${styleToString(component.style)}">
      ${fields}
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  `;
}