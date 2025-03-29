import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  
  // Demo purpose - replace with actual API calls
  useEffect(() => {
    // Fetch featured jobs logic will go here
    console.log('Fetch featured jobs');
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tìm công việc mơ ước của bạn</h1>
          <p className="text-xl mb-8">Hàng ngàn cơ hội việc làm đang chờ đón bạn</p>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="Chức danh, kỹ năng, công ty..."
                  className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Địa điểm"
                  className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Việc làm nổi bật</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example job card - replace with real data */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src="/company-logo.png" alt="Company Logo" className="w-12 h-12 mr-4" />
                  <div>
                    <h3 className="font-bold">Frontend Developer</h3>
                    <p className="text-gray-600">ABC Company</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700">Hà Nội</p>
                  <p className="text-gray-700">$1000 - $2000</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">ReactJS</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">TypeScript</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">NextJS</span>
                </div>
                
                <Link to="/job/1" className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Xem chi tiết
                </Link>
              </div>
            </div>
            
            {/* More job cards will be rendered from the API */}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/jobs" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Xem tất cả việc làm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;