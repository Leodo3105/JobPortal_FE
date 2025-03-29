import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes';
import { getCurrentUser } from './services/authService';
import { loginSuccess, loginFailure } from './store/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  
  // Kiểm tra người dùng đã đăng nhập khi app khởi động
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await getCurrentUser();
          dispatch(loginSuccess({ 
            user: response.user, 
            token 
          }));
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        dispatch(loginFailure('Phiên đăng nhập đã hết hạn'));
        localStorage.removeItem('token');
      }
    };
    
    loadUser();
  }, [dispatch]);
  
  return (
    <Router>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
}

export default App;