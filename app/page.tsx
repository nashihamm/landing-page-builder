// frontend/app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Page Builder</h1>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-700 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Create Beautiful</span>
                  <span className="block text-indigo-200">Landing Pages</span>
                </h2>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Build professional landing pages in minutes with our drag-and-drop page builder.
                  No coding required.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                    <Link
                      href="/register"
                      className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 sm:px-10"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/templates"
                      className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 sm:px-10"
                    >
                      View Templates
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Everything you need to create amazing landing pages
              </p>
            </div>

            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <span className="material-icons text-white text-2xl">drag_indicator</span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900">Drag & Drop Builder</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Easily build your page by dragging and dropping components exactly where you want them.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <span className="material-icons text-white text-2xl">palette</span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900">Beautiful Templates</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Start with professionally designed templates and customize them to match your brand.
                      </p>
                    </div>
                  </div>
                </div>
                // frontend/app/page.tsx (continuing the Features section)
                {/* Feature 3 */}
                <div className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <span className="material-icons text-white text-2xl">devices</span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900">Responsive Design</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Your pages will look great on any device - desktop, tablet, or mobile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block">Create your first page today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Join thousands of creators who are building amazing landing pages with our platform.
            </p>
            <Link
              href="/register"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
            >
              Sign up for free
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <span className="material-icons">twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <span className="material-icons">code</span>
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2024 Page Builder. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}