// frontend/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Page } from '@/types';


export default function DashboardPage() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateOptions, setShowCreateOptions] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await axios.get('/api/pages');
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

// app/dashboard/page.tsx (update createNewPage function)
const createNewPage = async (fromTemplate: boolean = false) => {
    try {
      const response = await axios.post('/api/pages', {
        name: `Untitled Page - ${new Date().toLocaleDateString()}`,
        components: [],
        subdomain: `page-${Date.now()}`,
        fromTemplate,
        createdBy: 'nashihamm',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        status: 'draft',
        layout: 'blank',
        settings: {
          theme: 'light',
          maxWidth: '1200px',
          spacing: 'normal',
        }
      });
      router.push(`/editor/${response.data.id}`);
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">My Pages</h1>
          <div className="relative">
            <button
              onClick={() => setShowCreateOptions(!showCreateOptions)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
            >
              <span>Create New Page</span>
              <span className="material-icons text-sm">
                {showCreateOptions ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {showCreateOptions && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <button
                    onClick={() => createNewPage(false)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <span className="material-icons text-gray-400 mr-2 text-sm">add_box</span>
                    Blank Page
                  </button>
                  <button
                    onClick={() => router.push('/templates')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <span className="material-icons text-gray-400 mr-2 text-sm">dashboard</span>
                    From Template
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {pages.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <span className="material-icons text-gray-400 text-4xl mb-4">description</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pages yet</h3>
            <p className="text-gray-500 mb-4">Create your first page to get started</p>
            <button
              onClick={() => createNewPage(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create Blank Page
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <div
                key={page.id}
                className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-100 relative">
                  {/* Thumbnail preview */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="material-icons text-4xl">web</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 truncate">{page.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      page.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {page.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {page.subdomain}.yourdomain.com
                  </p>
                  <div className="flex space-x-2">
                    <Link
                      href={`/editor/${page.id}`}
                      className="flex-1 px-3 py-2 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    {page.published && (
                      <a
                        href={`https://${page.subdomain}.yourdomain.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                      >
                        <span className="material-icons text-sm">open_in_new</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}