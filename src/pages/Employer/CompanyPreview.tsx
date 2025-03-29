import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCompanyProfile } from '../../services/companyService';
import { Company } from '../../types/company';
import { FiMapPin, FiUsers, FiCalendar, FiGlobe, FiFacebook, FiLinkedin, FiTwitter, FiEdit } from 'react-icons/fi';

const CompanyPreview = () => {
    const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  
  // Fetch company data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const companyData = await getCompanyProfile();
        setCompany(companyData);
      } catch (error) {
        console.error('Failed to fetch company profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompany();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!company) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Chưa có thông tin công ty</h1>
          <p className="text-gray-600 mb-6">Bạn chưa thiết lập thông tin công ty. Hãy cập nhật thông tin để hiển thị hồ sơ công ty.</p>
          <Link to="/employer/company-profile" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Cập nhật thông tin công ty
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Company header */}
        <div className="bg-gray-50 p-6 border-b relative">
          <Link to="/employer/company-profile" className="absolute top-4 right-4 text-gray-600 hover:text-blue-600">
            <FiEdit className="w-5 h-5" />
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white border rounded p-2">
              {company.logo ? (
                <img 
                  src={`/uploads/logos/${company.logo}`} 
                  alt={company.name} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400 text-xl font-bold">{company.name.charAt(0)}</span>
                </div>
              )}
            </div>
            
            <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
              <h1 className="text-2xl font-bold">{company.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start mt-2 mb-2">
                <div className="flex items-center text-gray-600 mr-4">
                  <FiMapPin className="mr-1" /> 
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mr-4">
                  <FiUsers className="mr-1" /> 
                  <span>{company.companySize}</span>
                </div>
                {company.foundedYear && (
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="mr-1" /> 
                    <span>Thành lập: {company.foundedYear}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-3 mt-2">
                {company.website && (
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FiGlobe className="w-5 h-5" />
                  </a>
                )}
                {company.socialMedia?.facebook && (
                  <a 
                    href={company.socialMedia.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FiFacebook className="w-5 h-5" />
                  </a>
                )}
                {company.socialMedia?.linkedin && (
                  <a 
                    href={company.socialMedia.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                )}
                {company.socialMedia?.twitter && (
                  <a 
                    href={company.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Company description */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Giới thiệu công ty</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{company.description}</p>
          </div>
        </div>
        
        {/* Company info */}
        <div className="p-6 bg-gray-50 border-t">
          <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700"><strong>Ngành nghề:</strong> {company.industry}</p>
              <p className="text-gray-700"><strong>Địa chỉ:</strong> {company.location}</p>
              {company.website && (
                <p className="text-gray-700">
                  <strong>Website:</strong>{' '}
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {company.website}
                  </a>
                </p>
              )}
            </div>
            <div>
              <p className="text-gray-700"><strong>Quy mô:</strong> {company.companySize} nhân viên</p>
              {company.foundedYear && (
                <p className="text-gray-700"><strong>Năm thành lập:</strong> {company.foundedYear}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPreview;