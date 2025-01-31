// frontend/src/components/Editor/ComponentMenu.tsx
import { Menu } from '@headlessui/react';
import { useEditor } from '@/app/contexts/EditorContext';
import { Component } from '@/types';

interface ComponentMenuProps {
  component: Component;
}

export default function ComponentMenu({ component }: ComponentMenuProps) {
  const { dispatch } = useEditor();

  const handleDelete = () => {
    dispatch({ type: 'DELETE_COMPONENT', payload: component.id });
  };

  const handleDuplicate = () => {
    const duplicatedComponent = {
      ...component,
      id: `component-${Date.now()}`,
    };
    dispatch({ type: 'ADD_COMPONENT', payload: duplicatedComponent });
  };

  return (
    <Menu as="div" className="absolute top-2 right-2 z-10">
      <Menu.Button className="p-1 rounded-full hover:bg-gray-100">
        <span className="material-icons text-gray-600">more_vert</span>
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleDuplicate}
              className={`${
                active ? 'bg-gray-100' : ''
              } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
            >
              <span className="material-icons text-sm mr-2">content_copy</span>
              Duplicate
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleDelete}
              className={`${
                active ? 'bg-gray-100' : ''
              } flex w-full items-center px-4 py-2 text-sm text-red-600`}
            >
              <span className="material-icons text-sm mr-2">delete</span>
              Delete
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}