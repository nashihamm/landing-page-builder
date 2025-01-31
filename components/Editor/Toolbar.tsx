// frontend/src/components/Editor/Toolbar.tsx
import { useEditor } from "@/app/contexts/EditorContext";
interface ToolbarProps {
  onSave: () => Promise<void>;
  saving: boolean;
}

export default function Toolbar({ onSave, saving }: ToolbarProps) {
  const { state, dispatch } = useEditor();

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleRedo = () => {
    dispatch({ type: 'REDO' });
  };

  const handleZoom = (zoom: number) => {
    dispatch({ type: 'SET_ZOOM', payload: zoom });
  };

  return (
    <div className="h-14 bg-white border-b px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleUndo}
          disabled={state.history.past.length === 0}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <span className="material-icons">undo</span>
        </button>
        <button
          onClick={handleRedo}
          disabled={state.history.future.length === 0}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <span className="material-icons">redo</span>
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleZoom(state.zoom - 10)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <span className="material-icons">zoom_out</span>
          </button>
          <span>{state.zoom}%</span>
          <button
            onClick={() => handleZoom(state.zoom + 10)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <span className="material-icons">zoom_in</span>
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Publish
        </button>
      </div>
    </div>
  );
}