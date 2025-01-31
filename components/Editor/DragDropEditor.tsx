// frontend/src/components/Editor/DragDropEditor.tsx
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Component } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addComponent } from '@/store/pageSlice';

export default function DragDropEditor() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Handle component dropping logic
      const newComponent: Component = {
        id: `component-${Date.now()}`,
        type: active.data.current.type,
        content: {},
        style: {},
      };
      
      dispatch(addComponent(newComponent));
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        <ComponentSidebar />
        <EditorCanvas />
      </div>
    </DndContext>
  );
}