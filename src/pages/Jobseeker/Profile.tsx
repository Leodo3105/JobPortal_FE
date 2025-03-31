import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { getUserProfile, updateUserProfile, uploadAvatar, uploadCV } from '../../services/profileService';
import { getCurrentUser } from '../../services/authService';
import { updateUserAvatar } from '../../store/slices/authSlice';
import { JobseekerProfile } from '../../types/user';
import { FiUpload, FiSave, FiPlus } from 'react-icons/fi';
import EducationForm from '../../components/profile/EducationForm';
import ExperienceForm from '../../components/profile/ExperienceForm';
import EducationCard from '../../components/profile/EducationCard';
import ExperienceCard from '../../components/profile/ExperienceCard';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<JobseekerProfile | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    bio: '',
    location: '',
    phone: '',
    website: '',
    skills: '',
    desiredPosition: '',
    desiredSalary: '',
    workType: 'full-time'
  });
  
  // Modal states
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  
  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await getUserProfile();
        setProfile(profileData);
        setFormData({
          title: profileData.title || '',
          bio: profileData.bio || '',
          location: profileData.location || '',
          phone: profileData.phone || '',
          website: profileData.website || '',
          skills: profileData.skills?.join(', ') || '',
          desiredPosition: profileData.desiredPosition || '',
          desiredSalary: profileData.desiredSalary?.toString() || '',
          workType: profileData.workType || 'full-time'
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Không thể tải thông tin hồ sơ');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
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
      
      // Convert skills string to array
      const skillsArray = formData.skills
        ? formData.skills.split(',').map(skill => skill.trim())
        : [];
      
      const updatedProfile = await updateUserProfile({
        title: formData.title,
        bio: formData.bio,
        location: formData.location,
        phone: formData.phone,
        website: formData.website,
        skills: skillsArray,
        desiredPosition: formData.desiredPosition,
        desiredSalary: formData.desiredSalary ? parseInt(formData.desiredSalary) : undefined,
        workType: formData.workType as 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'
      });
      
      setProfile(updatedProfile);
      toast.success('Hồ sơ đã được cập nhật thành công');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Không thể cập nhật hồ sơ');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle avatar upload

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Kích thước file quá lớn. Tối đa 2MB.');
      return;
    }
    
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('avatar', file);
      
      // Upload avatar và log kết quả để debug
      const result = await uploadAvatar(formData);
      console.log('Avatar upload result:', result);
      
      // Tạo avatarUrl nếu API không trả về
      const avatarUrl = result.avatarUrl || `/uploads/avatars/${result.avatar}`;
      
      // Cập nhật state trong Redux
      dispatch(updateUserAvatar({
        avatar: result.avatar,
        avatarUrl
      }));
      
      // Cập nhật state local nếu profile tồn tại
      if (profile) {
        // Định nghĩa interface tạm thời để mở rộng user
        type ExtendedUser = typeof profile.user & { avatarUrl: string };
        
        // Tạo đối tượng user đã cập nhật
        const updatedUser: ExtendedUser = {
          ...profile.user,
          avatar: result.avatar,
          avatarUrl
        };
        
        setProfile({
          ...profile,
          user: updatedUser
        });
      }
      
      // Refresh thông tin người dùng
      try {
        const userData = await getCurrentUser();
        console.log('Refreshed user data:', userData);
      } catch (refreshError) {
        console.error('Error refreshing user data:', refreshError);
      }
      
      toast.success('Ảnh đại diện đã được cập nhật');
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      toast.error('Không thể cập nhật ảnh đại diện');
    } finally {
      setUploading(false);
    }
  };
  
  // Handle CV upload
  const handleCVUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước file quá lớn. Tối đa 5MB.');
      return;
    }
    
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('cv', file);
      
      const result = await uploadCV(formData);
      
      // Update CV file in profile
      if (profile) {
        setProfile({
          ...profile,
          cvFile: result.fileName
        });
      }
      
      toast.success('CV đã được cập nhật thành công');
    } catch (error) {
      console.error('Failed to upload CV:', error);
      toast.error('Không thể cập nhật CV');
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
      <h1 className="text-2xl font-bold mb-6">Quản lý hồ sơ cá nhân</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Avatar section */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
              <div className="relative mb-4">
                {user?.avatar ? (
                  <img 
                    src={`${user.avatarUrl || `/uploads/avatars/${user.avatar}`}?t=${Date.now()}`}
                    alt={user?.name} 
                    className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer">
                  <FiUpload />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                    aria-label="Upload avatar"
                  />
                </label>
              </div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              
              {/* CV Upload Section */}
              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold mb-2">CV của bạn</h3>
                {profile?.cvFile ? (
                  <div className="p-3 border rounded mb-3 flex justify-between items-center">
                    <span className="truncate">{profile.cvFile}</span>
                    <a href={`/cv/${profile.cvFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                      Tải xuống
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-500 mb-3">Bạn chưa tải lên CV nào</p>
                )}
                <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center cursor-pointer">
                  <FiUpload className="mr-2" /> 
                  {profile?.cvFile ? 'Cập nhật CV' : 'Tải lên CV'}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleCVUpload}
                    disabled={uploading}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-1">Định dạng: PDF, DOC, DOCX. Tối đa 5MB</p>
              </div>
            </div>
            
            {/* Profile form */}
            <div className="w-full md:w-2/3 md:pl-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                      Tiêu đề hồ sơ *
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ví dụ: Frontend Developer với 5 năm kinh nghiệm"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                      Giới thiệu bản thân
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows={4}
                      placeholder="Mô tả ngắn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp của bạn"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                      Địa điểm
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ví dụ: Hà Nội, Việt Nam"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ví dụ: 0912345678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                      Website/Portfolio
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ví dụ: https://myportfolio.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desiredPosition">
                      Vị trí mong muốn
                    </label>
                    <input
                      id="desiredPosition"
                      name="desiredPosition"
                      type="text"
                      value={formData.desiredPosition}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ví dụ: Frontend Developer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desiredSalary">
                      Mức lương mong muốn (USD)
                    </label>
                    <input
                      id="desiredSalary"
                      name="desiredSalary"
                      type="number"
                      value={formData.desiredSalary}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ví dụ: 1500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workType">
                      Loại công việc
                    </label>
                    <select
                      id="workType"
                      name="workType"
                      value={formData.workType}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="full-time">Toàn thời gian</option>
                      <option value="part-time">Bán thời gian</option>
                      <option value="contract">Hợp đồng</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Thực tập</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
                      Kỹ năng (cách nhau bởi dấu phẩy)
                    </label>
                    <input
                      id="skills"
                      name="skills"
                      type="text"
                      value={formData.skills}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ví dụ: JavaScript, React, Node.js"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
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
      
      {/* Học vấn */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Học vấn</h2>
          <button 
            onClick={() => setShowEducationForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded flex items-center text-sm"
          >
            <FiPlus className="mr-1" /> Thêm
          </button>
        </div>
        <div className="p-6">
          {profile?.education && profile.education.length > 0 ? (
            <div className="space-y-4">
              {profile.education.map((edu) => (
                <EducationCard key={edu.id} education={edu} onDelete={() => {}} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Bạn chưa thêm thông tin học vấn nào.</p>
          )}
        </div>
      </div>
      
      {/* Kinh nghiệm làm việc */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Kinh nghiệm làm việc</h2>
          <button 
            onClick={() => setShowExperienceForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded flex items-center text-sm"
          >
            <FiPlus className="mr-1" /> Thêm
          </button>
        </div>
        <div className="p-6">
          {profile?.experience && profile.experience.length > 0 ? (
            <div className="space-y-4">
              {profile.experience.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} onDelete={() => {}} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Bạn chưa thêm thông tin kinh nghiệm làm việc nào.</p>
          )}
        </div>
      </div>
      
      {/* Các modal form */}
      {showEducationForm && (
        <EducationForm onClose={() => setShowEducationForm(false)} onSubmit={() => {}} />
      )}
      
      {showExperienceForm && (
        <ExperienceForm onClose={() => setShowExperienceForm(false)} onSubmit={() => {}} />
      )}
    </div>
  );
};

export default Profile;