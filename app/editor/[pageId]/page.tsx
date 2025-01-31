// app/editor/[pageId]/page.tsx
'use client';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import AdvancedToolbar from '../../../components/Editor/AdvancedToolbar';
import ComponentSidebar from '../../../components/Editor/ComponentSidebar';
import EditorCanvas from '../../../components/Editor/EditorCanvas';
import PropertiesPanel from '../../../components/Editor/PropertiesPanel';
import { pageService } from '../../../services/api';

interface EditorPageProps {
  params: {
    pageId: string;
  };
}

export default function EditorPage({ params }: EditorPageProps) {
  const { state, dispatch } = useEditor();

  useEffect(() => {
    loadPage();
  }, [params.pageId]);

  const loadPage = async () => {
    try {
      const response = await pageService.getPage(params.pageId);
      dispatch({ type: 'LOAD_COMPONENTS', payload: response.data.components || [] });
    } catch (error) {
      console.error('Error loading page:', error);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.data.current?.isNew) {
      const type = active.data.current.type;
      dispatch({
        type: 'ADD_COMPONENT',
        payload: {
          id: `component-${Date.now()}`,
          type,
          content: getDefaultContent(type),
          style: getDefaultStyle(type),
        },
      });
    }
  };

  const handleSave = async () => {
    try {
      await pageService.updatePage(params.pageId, {
        components: state.history.present,
      });
      // Show success message
    } catch (error) {
      console.error('Error saving page:', error);
      // Show error message
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col">
        <AdvancedToolbar onSave={handleSave} saving={false} />
        <div className="flex-1 flex overflow-hidden">
          <ComponentSidebar />
          <EditorCanvas components={state.history.present} />
          <PropertiesPanel />
        </div>
      </div>
    </DndContext>
  );
}