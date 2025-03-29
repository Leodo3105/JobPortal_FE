import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Thông tin về JobPortal */}
          <div>
            <h3 className="text-xl font-bold mb-4">JobPortal</h3>
            <p className="text-gray-300 mb-4">
              Nền tảng kết nối nhà tuyển dụng và người tìm việc hàng đầu Việt Nam.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Dành cho người tìm việc */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dành cho người tìm việc</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white">Tìm việc làm</Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-300 hover:text-white">Danh sách công ty</Link>
              </li>
              <li>
                <Link to="/blog/resume-tips" className="text-gray-300 hover:text-white">Mẹo viết CV</Link>
              </li>
              <li>
                <Link to="/blog/interview-tips" className="text-gray-300 hover:text-white">Kỹ năng phỏng vấn</Link>
              </li>
            </ul>
          </div>

          {/* Dành cho nhà tuyển dụng */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dành cho nhà tuyển dụng</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/employer/post-job" className="text-gray-300 hover:text-white">Đăng tin tuyển dụng</Link>
              </li>
              <li>
                <Link to="/employer/pricing" className="text-gray-300 hover:text-white">Báo giá dịch vụ</Link>
              </li>
              <li>
                <Link to="/employer/resources" className="text-gray-300 hover:text-white">Tài nguyên</Link>
              </li>
              <li>
                <Link to="/employer/contact" className="text-gray-300 hover:text-white">Liên hệ đội ngũ</Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ và hỗ trợ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ & Hỗ trợ</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-300 mr-2">
                  <i className="fas fa-map-marker-alt mt-1"></i>
                </span>
                <span className="text-gray-300">123 Đường ABC, Quận XYZ, Thành phố HCM</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-300 mr-2">
                  <i className="fas fa-phone"></i>
                </span>
                <span className="text-gray-300">+84 123 456 789</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-300 mr-2">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="text-gray-300">contact@jobportal.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} JobPortal. Tất cả quyền được bảo lưu.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-white text-sm">Điều khoản sử dụng</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">Chính sách bảo mật</Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-gray-300 hover:text-white text-sm">Cookie</Link>
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