// frontend/src/types/index.ts
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  }
  
//   export interface Page {
//     id: string;
//     name: string;
//     slug: string;
//     components: Component[];
//     published: boolean;
//     subdomain: string;
//   }

  export interface Page {
    id: string;
    name: string;
    slug: string;
    components: any[];
    published: boolean;
    subdomain: string;
    fromTemplate?: boolean;
  }
  
  export interface Component {
    id: string;
    type: ComponentType;
    content: any;
    style: Record<string, string>;
    children?: Component[];
  }
  
  export type ComponentType = 'container' | 'text' | 'image' | 'form' | 'button';
  
  export interface FormField {
    id: string;
    type: 'text' | 'email' | 'number';
    label: string;
    required: boolean;
    placeholder?: string;
  }

  export interface Template {
    id: string;
    name: string;
    thumbnail: string;
    description: string;
    category: string;
    components: Component[];
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