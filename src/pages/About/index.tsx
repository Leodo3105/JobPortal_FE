import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Về chúng tôi</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4">
          JobPortal là nền tảng tìm kiếm việc làm hàng đầu tại Việt Nam, kết nối các nhà tuyển dụng 
          và ứng viên tiềm năng thông qua một hệ thống hiện đại và tiện lợi.
        </p>
        
        <p className="mb-4">
          Chúng tôi tin rằng mỗi người đều xứng đáng có một công việc tốt, và mỗi công ty đều
          xứng đáng tìm được nhân viên tài năng.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Sứ mệnh của chúng tôi</h2>
        <p>
          Sứ mệnh của JobPortal là tạo ra một nền tảng đơn giản, hiệu quả và thông minh 
          để kết nối đúng người với đúng công việc, thúc đẩy sự phát triển của cả cá nhân và doanh nghiệp.
        </p>
      </div>
    </div>
  );
};

export default About;