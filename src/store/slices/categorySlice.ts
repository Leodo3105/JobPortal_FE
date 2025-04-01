import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory as deleteCategoryApi 
} from '../../services/categoryService';
import { Category } from '../../services/categoryService';

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
  successMessage: null
};

type ApiError = {
    response?: {
      data?: {
        error?: string;
      };
    };
  };

// Thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async ({ type, active }: { type?: string; active?: boolean } = {}, { rejectWithValue }) => {
    try {
      return await getCategories(type, active);
    } catch (error: unknown) {
      // Xử lý lỗi chi tiết hơn
      console.error('Error fetching categories:', error);
      const errorMessage = 
        (error as { response?: { data?: { error?: string } }; message?: string })?.response?.data?.error || 
        (error as Error)?.message || 
        'Không thể tải danh sách danh mục';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
    'categories/fetchCategoryById',
    async (id: string, { rejectWithValue }) => {
      try {
        return await getCategoryById(id);
      } catch (error: unknown) {
        console.error('Error fetching category by ID:', error);
  
        // Type guard to check if error is an ApiError
        const isApiError = (err: unknown): err is ApiError =>
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof (err as ApiError).response?.data?.error === 'string';
  
        const errorMessage = isApiError(error)
          ? error.response?.data?.error
          : error instanceof Error
          ? error.message
          : 'Không thể tải thông tin danh mục';
  
        return rejectWithValue(errorMessage);
      }
    }
  );

  export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (
      categoryData: {
        name: string;
        type: 'industry' | 'skill' | 'position' | 'location';
        description?: string;
        icon?: string;
      },
      { rejectWithValue }
    ) => {
      try {
        return await createCategory(categoryData);
      } catch (error: unknown) {
        console.error('Error creating category:', error);
  
        // Type guard to check if error is an ApiError
        const isApiError = (err: unknown): err is ApiError =>
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof (err as ApiError).response?.data?.error === 'string';
  
        const errorMessage = isApiError(error)
          ? error.response?.data?.error
          : error instanceof Error
          ? error.message
          : 'Không thể tạo danh mục';
  
        return rejectWithValue(errorMessage);
      }
    }
  );

  export const editCategory = createAsyncThunk(
    'categories/editCategory',
    async (
      { id, categoryData }: {
        id: string;
        categoryData: {
          name?: string;
          description?: string;
          icon?: string;
          active?: boolean;
        };
      },
      { rejectWithValue }
    ) => {
      try {
        return await updateCategory(id, categoryData);
      } catch (error: unknown) {
        console.error('Error updating category:', error);
  
        // Type guard to check if error is an ApiError
        const isApiError = (err: unknown): err is ApiError =>
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof (err as ApiError).response?.data?.error === 'string';
  
        const errorMessage = isApiError(error)
          ? error.response?.data?.error
          : error instanceof Error
          ? error.message
          : 'Không thể cập nhật danh mục';
  
        return rejectWithValue(errorMessage);
      }
    }
  );

  export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id: string, { rejectWithValue }) => {
      try {
        await deleteCategoryApi(id);
        return id;
      } catch (error: unknown) {
        console.error('Error deleting category:', error);
  
        // Type guard to check if error is an ApiError
        const isApiError = (err: unknown): err is ApiError =>
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof (err as ApiError).response?.data?.error === 'string';
  
        const errorMessage = isApiError(error)
          ? error.response?.data?.error
          : error instanceof Error
          ? error.message
          : 'Không thể xóa danh mục';
  
        return rejectWithValue(errorMessage);
      }
    }
  );

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.currentCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.successMessage = 'Danh mục đã được tạo thành công';
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Edit category
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(editCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.currentCategory = action.payload;
        state.successMessage = 'Danh mục đã được cập nhật thành công';
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
        state.successMessage = 'Danh mục đã được xóa thành công';
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearErrors, clearMessages, clearCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;