import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../../services/auth';
import { toast } from "react-toastify";
import Navbar from "../Home/Navbar/Navbar";
import Doctor from "../../../Assets/doctor-login.png";
import './Auth.css';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    if (isSignup && password !== confirmPassword) {
      toast.error("Mật khẩu không khớp", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    try {
      if (isSignup) {
        await signup({ firstName, lastName, email, password });
        toast.success("Đăng ký thành công, sẽ chuyển sang trang đăng nhập trong giây lát", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setTimeout(() => {
          setIsSignup(false);
        }, 1000);
      } else {
        const data = await signin({ email, password });
        localStorage.setItem('token', data.token);
        toast.success("Đăng nhập thành công", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(`${isSignup ? 'Đăng ký' : 'Đăng nhập'} thất bại. Vui lòng thử lại.`, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      setIsSubmitDisabled(true);
      setTimeout(() => {
        setIsSubmitDisabled(false);
      }, 5000);
    }
  };

  const toggleSignup = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsSignup(!isSignup);
      setIsAnimating(false);
    }, 300);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: windowWidth < 768 ? 'column' : 'row',
    height: `${windowHeight - 80}px`,
    overflow: 'hidden',
  };

  const imageFrameStyle = {
    flex: windowWidth < 768 ? '0 0 30%' : 1,
    background: 'linear-gradient(to right, #ECF2FF, #FBFCFF)',
    display: windowWidth < 768 ? 'none' : 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '5px 0 15px rgba(0, 0, 0, 0.1)',
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    // marginTop: '40px', // Increased spacing
  };

  const imageStyle = {
    maxWidth: '70%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '10px',
    margin: 'auto',
  };

  const sloganStyle = {
    fontSize: windowWidth < 1024 ? '2rem' : '2.5rem',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1,
  };

  const descriptionStyle = {
    fontSize: windowWidth < 1024 ? '1rem' : '1.2rem',
    maxWidth: '100%',
    lineHeight: '1.6',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    textAlign: 'center', // Căn giữa văn bản theo chiều ngang
    zIndex: 1,
  };

  const animationStyle = {
    position: 'absolute',
    
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    background: 'linear-gradient(45deg, #ECF2FF, #FBFCFF, #ECF2FF)',
    backgroundSize: '400% 400%',
  };

  const formFrameStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: windowWidth < 768 ? '20px' : '0',
  };

  const formContainerStyle = {
    width: windowWidth < 768 ? '100%' : '80%',
    maxWidth: '400px',
    padding: windowWidth < 768 ? '30px' : '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    animation: isAnimating ? 'fadeOutIn 0.6s ease-out' : 'fadeIn 1s ease-out',
    transition: 'all 0.3s ease-out',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#1A8EFD',
    marginBottom: '30px',
    fontSize: windowWidth < 768 ? '24px' : '28px',
    fontWeight: 'bold',
    animation: 'slideDown 0.5s ease-out',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#1A8EFD',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const switchButtonStyle = {
    marginTop: '20px',
    background: 'transparent',
    border: 'none',
    color: '#1A8EFD',
    cursor: 'pointer',
    fontSize: '16px',
    textDecoration: 'underline',
    transition: 'all 0.3s ease',
    display: 'block',
    margin: '20px auto 0',
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        {windowWidth >= 768 && (
          <div style={imageFrameStyle}>
            <div style={animationStyle}></div>
            <div>
              <h1 style={sloganStyle}>Chăm sóc sức khỏe tận tâm</h1>
              <p style={descriptionStyle}>
                Phòng khám của chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao,
                với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.
                Sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi.
              </p>
            </div>
            <div style={imageContainerStyle}>
              <img src={Doctor} alt="Doctor" style={imageStyle} />
            </div>
            <div className="floating-icon" style={{ animation: 'float 4s ease-in-out infinite' }}>🏥</div>
            <div className="floating-icon" style={{ animation: 'float 5s ease-in-out infinite 1s', left: '15%'}}>👨‍⚕️</div>
            <div className="floating-icon" style={{ animation: 'float 6s ease-in-out infinite 0.5s' }}>🩹</div>
            <div className="floating-icon" style={{ animation: 'float 5.5s ease-in-out infinite 0.7s', left: '-30%' }}>🩺</div>
            <div className="floating-icon" style={{ animation: 'float 4.5s ease-in-out infinite 1.2s',left: '70%', top: '45%' }}>💉</div>
            <div className="floating-icon" style={{ animation: 'float 5s ease-in-out infinite 0.3s', left: '48%', top: '62%' }}>🧬</div>
            <div className="floating-icon" style={{ animation: 'float 4.8s ease-in-out infinite 0.9s', right: '5%', bottom: '20%' }}>🧪</div>
            <div className="floating-icon" style={{ animation: 'float 5.2s ease-in-out infinite 0.6s', left: '20%', top: '40%' }}>💊</div>
          </div>
        )}
        <div style={formFrameStyle}>
          <div style={formContainerStyle}>
            <h2 style={titleStyle}>{isSignup ? 'Đăng Ký' : 'Đăng Nhập'}</h2>
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Họ"
                    required
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Tên"
                    required
                    style={inputStyle}
                  />
                </>
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={inputStyle}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                required
                style={inputStyle}
              />
              {isSignup && (
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu"
                  required
                  style={inputStyle}
                />
              )}
              <button type="submit" style={buttonStyle} className="button" disabled={isSubmitDisabled}>
                {isSignup ? 'Đăng Ký' : 'Đăng Nhập'}
              </button>
            </form>
            <button onClick={toggleSignup} style={switchButtonStyle} className="button">
              {isSignup ? 'Đã có tài khoản? Đăng Nhập' : 'Chưa có tài khoản? Đăng Ký'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;