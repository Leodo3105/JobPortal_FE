import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { getCompanyProfile, updateCompanyProfile, uploadLogo } from '../../services/companyService';
import { Company } from '../../types/company';
import { FiUpload, FiSave, FiLink, FiMapPin, FiUsers, FiCalendar } from 'react-icons/fi';

const CompanyProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    industry: '',
    companySize: '1-10',
    location: '',
    foundedYear: '',
    facebook: '',
    linkedin: '',
    twitter: ''
  });
  
  // Fetch company data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const companyData = await getCompanyProfile();
        setCompany(companyData);
        
        setFormData({
          name: companyData.name || '',
          description: companyData.description || '',
          website: companyData.website || '',
          industry: companyData.industry || '',
          companySize: companyData.companySize || '1-10',
          location: companyData.location || '',
          foundedYear: companyData.foundedYear?.toString() || '',
          facebook: companyData.socialMedia?.facebook || '',
          linkedin: companyData.socialMedia?.linkedin || '',
          twitter: companyData.socialMedia?.twitter || ''
        });
      } catch (error) {
        console.error('Failed to fetch company profile:', error);
        toast.error('Không thể tải thông tin công ty');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompany();
  }, []);
  
  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      const updatedCompany = await updateCompanyProfile({
        id: company?.id,
        name: formData.name,
        description: formData.description,
        website: formData.website,
        industry: formData.industry,
        companySize: formData.companySize as Company['companySize'],
        location: formData.location,
        foundedYear: formData.foundedYear ? parseInt(formData.foundedYear) : undefined,
        socialMedia: {
          facebook: formData.facebook,
          linkedin: formData.linkedin,
          twitter: formData.twitter
        }
      });
      
      setCompany(updatedCompany);
      toast.success('Thông tin công ty đã được cập nhật thành công');
    } catch (error) {
      console.error('Failed to update company profile:', error);
      toast.error('Không thể cập nhật thông tin công ty');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle logo upload
  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Kích thước file quá lớn. Tối đa 2MB.');
      return;
    }
    
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('logo', file);
      
      const result = await uploadLogo(formData);
      
      // Update company logo in state
      if (company) {
        setCompany({
          ...company,
          logo: result.logo
        });
      }
      
      toast.success('Logo công ty đã được cập nhật');
    } catch (error) {
      console.error('Failed to upload logo:', error);
      toast.error('Không thể cập nhật logo công ty');
    } finally {
      setUploading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý thông tin công ty</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Logo section */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
              <div className="relative mb-4">
                {company?.logo ? (
                  <img 
                    src={`/uploads/logos/${company.logo}`} 
                    alt={company.name} 
                    className="w-64 h-64 object-contain border rounded p-2"
                  />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded bg-gray-50">
                    <span className="text-gray-500 text-sm">Logo công ty</span>
                  </div>
                )}
                <label className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer">
                  <FiUpload />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleLogoUpload}
                    disabled={uploading}
                    title="Upload company logo"
                    aria-label="Upload company logo"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">Định dạng: JPEG, PNG, GIF. Tối đa 2MB</p>
              
              {/* Company quick info */}
              {company && (
                <div className="mt-6 w-full">
                  <h3 className="text-lg font-semibold mb-3">Thông tin nhanh</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <FiUsers className="mr-2" />
                      <span>Quy mô: {company.companySize}</span>
                    </div>
                    {company.foundedYear && (
                      <div className="flex items-center text-gray-700">
                        <FiCalendar className="mr-2" />
                        <span>Năm thành lập: {company.foundedYear}</span>
                      </div>
                    )}
                    {company.location && (
                      <div className="flex items-center text-gray-700">
                        <FiMapPin className="mr-2" />
                        <span>{company.location}</span>
                      </div>
                    )}
                    {company.website && (
                      <div className="flex items-center text-gray-700">
                        <FiLink className="mr-2" />
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {company.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Company form */}
            <div className="w-full md:w-2/3 md:pl-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Tên công ty *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Mô tả công ty *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={6}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
                      Ngành nghề *
                    </label>
                    <input
                      id="industry"
                      name="industry"
                      type="text"
                      value={formData.industry}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companySize">
                      Quy mô công ty *
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="1-10">1-10 nhân viên</option>
                      <option value="11-50">11-50 nhân viên</option>
                      <option value="51-200">51-200 nhân viên</option>
                      <option value="201-500">201-500 nhân viên</option>
                      <option value="501-1000">501-1000 nhân viên</option>
                      <option value="1000+">1000+ nhân viên</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                      Địa điểm *
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foundedYear">
                      Năm thành lập
                    </label>
                    <input
                      id="foundedYear"
                      name="foundedYear"
                      type="number"
                      value={formData.foundedYear}
                      onChange={handleChange}
                      min="1900"
                      max={new Date().getFullYear()}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                
                <div className="mt-4 mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                    Website
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Mạng xã hội
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-600 text-sm mb-1" htmlFor="facebook">
                        Facebook
                      </label>
                      <input
                        id="facebook"
                        name="facebook"
                        type="url"
                        value={formData.facebook}
                        onChange={handleChange}
                        placeholder="https://facebook.com/your-page"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-600 text-sm mb-1" htmlFor="linkedin">
                        LinkedIn
                      </label>
                      <input
                        id="linkedin"
                        name="linkedin"
                        type="url"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/company/your-company"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-600 text-sm mb-1" htmlFor="twitter">
                        Twitter
                      </label>
                      <input
                        id="twitter"
                        name="twitter"
                        type="url"
                        value={formData.twitter}
                        onChange={handleChange}
                        placeholder="https://twitter.com/your-handle"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center disabled:opacity-50"
                  >
                    <FiSave className="mr-2" />
                    {saving ? 'Đang lưu...' : 'Lưu thông tin'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subscription section */}
      {company && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Gói dịch vụ</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {company.subscription.type === 'free' && 'Miễn phí'}
                  {company.subscription.type === 'basic' && 'Cơ bản'}
                  {company.subscription.type === 'premium' && 'Premium'}
                  {company.subscription.type === 'enterprise' && 'Doanh nghiệp'}
                </span>
                <div className="mt-2 text-gray-600">
                  <p>
                    Trạng thái: 
                    <span className={`ml-2 font-medium ${
                      company.subscription.status === 'active' ? 'text-green-600' :
                      company.subscription.status === 'expired' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {company.subscription.status === 'active' && 'Đang hoạt động'}
                      {company.subscription.status === 'expired' && 'Đã hết hạn'}
                      {company.subscription.status === 'canceled' && 'Đã hủy'}
                    </span>
                  </p>
                  <p className="mt-1">
                    Hết hạn: {new Date(company.subscription.endDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Nâng cấp gói dịch vụ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;