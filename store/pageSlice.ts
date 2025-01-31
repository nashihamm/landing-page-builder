// frontend/src/store/pageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Page, Component } from '@/types';

interface PageState {
  currentPage: Page | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PageState = {
  currentPage: null,
  isLoading: false,
  error: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload;
    },
    addComponent: (state, action: PayloadAction<Component>) => {
      if (state.currentPage) {
        state.currentPage.components.push(action.payload);
      }
    },
    updateComponent: (state, action: PayloadAction<{ id: string; component: Component }>) => {
      if (state.currentPage) {
        const index = state.currentPage.components.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.currentPage.components[index] = action.payload.component;
        }
      }
    },
    // Add more reducers as needed
  },
});

export const { setCurrentPage, addComponent, updateComponent } = pageSlice.actions;
export default pageSlice.reducer;