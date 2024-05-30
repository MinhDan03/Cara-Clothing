import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ThankYou() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       // Chuyển hướng về trang home sau 5 giây

//       navigate('/');
//     }, 5000);

//     // Cleanup để tránh leak memory
//     return () => clearTimeout(timeoutId);
//   }, [navigate]);

  return (
    <div>
      <div className="" style={{ height: "auto" }}>
        <img src="/img/thankyou.png" alt="" className="" />
      </div>
    </div>
  );
}

export default ThankYou;
