// frontend/src/components/Editor/PublishDialog.tsx
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { Page } from '@/types';
import { pageService } from '@/services/api';

interface PublishDialogProps {
  page: Page;
  isOpen: boolean;
  onClose: () => void;
  onPublished: () => void;
}

export default function PublishDialog({
  page,
  isOpen,
  onClose,
  onPublished,
}: PublishDialogProps) {
  const [publishing, setPublishing] = useState(false);
  const [subdomain, setSubdomain] = useState(page.subdomain);

  const handlePublish = async () => {
    try {
      setPublishing(true);
      await pageService.updatePage(page.id, { subdomain });
      await pageService.publishPage(page.id);
      onPublished();
      onClose();
    } catch (error) {
      console.error('Error publishing page:', error);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-modal">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Publish Page
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subdomain
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                  .yourdomain.com
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {publishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}