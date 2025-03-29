import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { getCurrentUser } from './services/authService';
import { loginSuccess, loginFailure } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  
  // Check for logged in user on app load
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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;