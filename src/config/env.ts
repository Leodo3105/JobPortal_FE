// Environment variables with type safety
export const env = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    NODE_ENV: import.meta.env.MODE || 'development',
    // Thêm các biến môi trường khác nếu cần
  };