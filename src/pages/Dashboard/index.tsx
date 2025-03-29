import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    applications: 0,
    savedJobs: 0
  });

  useEffect(() => {
    // Giả lập dữ liệu dashboard
    // Sau này sẽ thay thế bằng API call thực tế
    setTimeout(() => {
      setStats({
        totalJobs: 125,
        activeJobs: 42,
        applications: 18,
        savedJobs: 7
      });
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm uppercase">Tổng Việc Làm</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalJobs}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm uppercase">Việc Làm Đang Hoạt Động</h2>
          <p className="text-3xl font-bold text-green-600">{stats.activeJobs}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm uppercase">Đơn Ứng Tuyển</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.applications}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm uppercase">Việc Làm Đã Lưu</h2>
          <p className="text-3xl font-bold text-yellow-600">{stats.savedJobs}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Hoạt Động Gần Đây</h2>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">Bạn đã ứng tuyển vào vị trí "Frontend Developer" tại ABC Company</p>
              <p className="text-xs text-gray-400">2 giờ trước</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">Bạn đã lưu vị trí "UI/UX Designer" tại XYZ Corp</p>
              <p className="text-xs text-gray-400">1 ngày trước</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">Bạn đã cập nhật CV của mình</p>
              <p className="text-xs text-gray-400">3 ngày trước</p>
            </div>
          </div>
        </div>
        
        {/* Recommended Jobs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Việc Làm Phù Hợp</h2>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="font-medium">Backend Developer</p>
              <p className="text-sm text-gray-600">DEF Solutions - Hà Nội</p>
              <p className="text-xs text-gray-500 mt-1">Mức lương: 1500$ - 2500$</p>
            </div>
            <div className="border-b pb-2">
              <p className="font-medium">React Developer</p>
              <p className="text-sm text-gray-600">Tech Innovators - TP.HCM</p>
              <p className="text-xs text-gray-500 mt-1">Mức lương: 1200$ - 2000$</p>
            </div>
            <div className="border-b pb-2">
              <p className="font-medium">Product Manager</p>
              <p className="text-sm text-gray-600">Global Software Inc - Đà Nẵng</p>
              <p className="text-xs text-gray-500 mt-1">Mức lương: 2000$ - 3500$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;