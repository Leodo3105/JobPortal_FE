import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Về chúng tôi */}
          <div>
            <h3 className="text-xl font-bold mb-4">JobPortal</h3>
            <p className="text-gray-300 mb-4">
              Nền tảng kết nối nhà tuyển dụng và người tìm việc hàng đầu Việt Nam, 
              giúp người tìm việc tìm được công việc phù hợp và nhà tuyển dụng 
              tìm được ứng viên tài năng.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Facebook">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Twitter">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="LinkedIn">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Instagram">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Dành cho người tìm việc */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dành cho người tìm việc</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white">
                  Tìm việc làm
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-300 hover:text-white">
                  Danh sách công ty
                </Link>
              </li>
              <li>
                <Link to="/blog/resume-tips" className="text-gray-300 hover:text-white">
                  Mẹo viết CV
                </Link>
              </li>
              <li>
                <Link to="/blog/interview-tips" className="text-gray-300 hover:text-white">
                  Kỹ năng phỏng vấn
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Dành cho nhà tuyển dụng */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dành cho nhà tuyển dụng</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/employer/post-job" className="text-gray-300 hover:text-white">
                  Đăng tin tuyển dụng
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white">
                  Báo giá dịch vụ
                </Link>
              </li>
              <li>
                <Link to="/employer-resources" className="text-gray-300 hover:text-white">
                  Tài nguyên nhà tuyển dụng
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Liên hệ tư vấn
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-2 text-gray-300" />
                <span className="text-gray-300">
                  123 Nguyễn Văn Linh, Quận 7, TP.HCM
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 text-gray-300" />
                <span className="text-gray-300">+84 123 456 789</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2 text-gray-300" />
                <span className="text-gray-300">info@jobportal.vn</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} JobPortal. Tất cả quyền được bảo lưu.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                    Điều khoản sử dụng
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">
                    Chính sách cookie
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;