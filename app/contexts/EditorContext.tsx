// app/contexts/EditorContext.tsx
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Component {
  id: string;
  type: string;
  content: any;
  style: Record<string, string>;
}

export interface EditorState {
  selectedComponent: Component | null;
  isDragging: boolean;
  zoom: number;
  history: {
    past: Component[][];
    present: Component[];
    future: Component[][];
  };
}

type Action =
  | { type: 'SELECT_COMPONENT'; payload: Component | null }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'ADD_COMPONENT'; payload: Component }
  | { type: 'UPDATE_COMPONENT'; payload: { id: string; updates: Partial<Component> } }
  | { type: 'DELETE_COMPONENT'; payload: string }
  | { type: 'LOAD_COMPONENTS'; payload: Component[] }
  | { type: 'UNDO' }
  | { type: 'REDO' };

const initialState: EditorState = {
  selectedComponent: null,
  isDragging: false,
  zoom: 100,
  history: {
    past: [],
    present: [],
    future: [],
  },
};

const EditorContext = createContext<{
  state: EditorState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function editorReducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case 'SELECT_COMPONENT':
      return { ...state, selectedComponent: action.payload };
    
    case 'SET_DRAGGING':
      return { ...state, isDragging: action.payload };
    
    case 'SET_ZOOM':
      return { ...state, zoom: Math.min(Math.max(25, action.payload), 200) };
    
    case 'LOAD_COMPONENTS':
      return {
        ...state,
        history: {
          past: [],
          present: action.payload,
          future: [],
        },
      };
    
    case 'ADD_COMPONENT':
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: [...state.history.present, action.payload],
          future: [],
        },
        selectedComponent: action.payload,
      };
    
    case 'UPDATE_COMPONENT':
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: state.history.present.map(component =>
            component.id === action.payload.id
              ? { ...component, ...action.payload.updates }
              : component
          ),
          future: [],
        },
      };
    
    case 'DELETE_COMPONENT':
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: state.history.present.filter(
            component => component.id !== action.payload
          ),
          future: [],
        },
        selectedComponent: null,
      };
    
    case 'UNDO':
      if (state.history.past.length === 0) return state;
      const previous = state.history.past[state.history.past.length - 1];
      return {
        ...state,
        history: {
          past: state.history.past.slice(0, -1),
          present: previous,
          future: [state.history.present, ...state.history.future],
        },
      };
    
    case 'REDO':
      if (state.history.future.length === 0) return state;
      const next = state.history.future[0];
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: next,
          future: state.history.future.slice(1),
        },
      };
    
    default:
      return state;
  }
}

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => useContext(EditorContext);