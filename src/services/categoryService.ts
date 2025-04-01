import api from '../config/axios';

export interface Category {
  id: string;
  name: string;
  type: 'industry' | 'skill' | 'position' | 'location';
  slug: string;
  description?: string;
  icon?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Lấy danh sách danh mục
export const getCategories = async (type?: string, active?: boolean): Promise<Category[]> => {
  const url = type ? `/categories/type/${type}` : '/categories';
  let params = {};
  if (active !== undefined) {
    params = { active: active.toString() };
  }
  const response = await api.get<{ success: boolean; data: Category[] }>(url, { params });
  return response.data.data;
};

// Lấy chi tiết danh mục
export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get<{ success: boolean; data: Category }>(`/categories/${id}`);
  return response.data.data;
};

// Tạo danh mục mới
export const createCategory = async (categoryData: {
  name: string;
  type: 'industry' | 'skill' | 'position' | 'location';
  description?: string;
  icon?: string;
}): Promise<Category> => {
  const response = await api.post<{ success: boolean; data: Category }>('/categories', categoryData);
  return response.data.data;
};

// Cập nhật danh mục
export const updateCategory = async (
  id: string,
  categoryData: {
    name?: string;
    description?: string;
    icon?: string;
    active?: boolean;
  }
): Promise<Category> => {
  const response = await api.put<{ success: boolean; data: Category }>(`/categories/${id}`, categoryData);
  return response.data.data;
};

// Xóa danh mục
export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete<{ success: boolean }>(`/categories/${id}`);
};