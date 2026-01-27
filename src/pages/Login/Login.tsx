import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  BookOpen,
  GraduationCap,
  Globe,
  Languages,
  Award,
  Users,
  Trophy,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  UserPlus,
} from 'lucide-react';
import { authService } from '@/api';
import '@/styles/Login.css';

// Form mode type
type FormMode = 'login' | 'register';

// Register form data interface
interface RegisterFormData {
  username: string;
  fullname: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

const Login = () => {
  const navigate = useNavigate();
  
  // Form mode state
  const [formMode, setFormMode] = useState<FormMode>('login');
  
  // Login states
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Register states
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: '',
    fullname: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  // Refs for animations
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderLogoRef = useRef<HTMLImageElement>(null);
  const loaderTextRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLDivElement>(null);
  const loginFormRef = useRef<HTMLDivElement>(null);
  const floatIconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const masterTl = gsap.timeline();

    // PART 1: LOADING SCREEN
    masterTl
      .to(loaderLogoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      })
      .to(
        loaderTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        '-=0.5'
      )
      .to(
        loaderRef.current,
        {
          xPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        },
        '-=0.2'
      );

    // PART 2: FLOATING ICONS appear
    floatIconRefs.current.forEach((ref, index) => {
      masterTl.to(
        ref,
        {
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        index === 0 ? '-=0.8' : '-=0.6'
      );
    });

    // PART 3: WELCOME TEXT appears
    masterTl.to(
      welcomeTextRef.current,
      {
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    // PART 4: LOGIN FORM APPEARS
    const isDesktop = window.innerWidth > 1024;
    masterTl.to(
      loginFormRef.current,
      {
        opacity: 1,
        scale: 1,
        y: isDesktop ? '-50%' : 0,
        duration: 1,
        ease: 'back.out(1.4)',
      },
      '-=0.8'
    );

    // CONTINUOUS FLOATING ANIMATION FOR ICONS
    const floatingDelays = [3, 3.2, 3.4, 3.6, 3.8];
    const floatingYs = [-20, -15, -25, -18, -22];
    const floatingDurations = [2.5, 3, 2.8, 3.2, 2.6];

    floatIconRefs.current.forEach((ref, index) => {
      gsap.to(ref, {
        y: floatingYs[index],
        duration: floatingDurations[index],
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: floatingDelays[index],
      });
    });

    return () => {
      masterTl.kill();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!username.trim()) {
      setError('Vui lòng nhập tên đăng nhập');
      return;
    }
    if (!password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ username: username.trim(), password });
      
      // Save tokens
      authService.saveTokens(response.data.accessToken, response.data.refreshToken);
      
      // Save user data
      if (response.data.user) {
        authService.saveUser(response.data.user);
      }

      // Remember me - save username
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username.trim());
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      // Navigate to dashboard or home
      navigate('/');
    } catch (err: unknown) {
      console.error('Login error:', err);
      
      // Handle different error types
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string }; status?: number } };
        if (axiosError.response?.data?.message) {
          setError(axiosError.response.data.message);
        } else if (axiosError.response?.status === 401) {
          setError('Tên đăng nhập hoặc mật khẩu không chính xác');
        } else if (axiosError.response?.status === 400) {
          setError('Thông tin đăng nhập không hợp lệ');
        } else {
          setError('Đã xảy ra lỗi. Vui lòng thử lại sau');
        }
      } else if (err && typeof err === 'object' && 'request' in err) {
        setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng');
      } else {
        setError('Đã xảy ra lỗi. Vui lòng thử lại sau');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validation
    if (!registerData.username.trim()) {
      setError('Vui lòng nhập tên đăng nhập');
      return;
    }
    if (registerData.username.length < 3) {
      setError('Tên đăng nhập phải có ít nhất 3 ký tự');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(registerData.username)) {
      setError('Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới');
      return;
    }
    if (!registerData.fullname.trim()) {
      setError('Vui lòng nhập họ tên');
      return;
    }
    if (!registerData.phone.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }
    if (!/^[0-9]{10,15}$/.test(registerData.phone)) {
      setError('Số điện thoại không hợp lệ (10-15 số)');
      return;
    }
    if (!registerData.email.trim()) {
      setError('Vui lòng nhập email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      setError('Email không hợp lệ');
      return;
    }
    if (!registerData.dateOfBirth) {
      setError('Vui lòng chọn ngày sinh');
      return;
    }
    if (!registerData.password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }
    if (registerData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);

    try {
      await authService.register({
        username: registerData.username.trim(),
        fullname: registerData.fullname.trim(),
        phone: registerData.phone.trim(),
        email: registerData.email.trim(),
        dateOfBirth: registerData.dateOfBirth,
        password: registerData.password,
      });

      // Show success message and switch to login
      setSuccessMessage('Đăng ký thành công! Vui lòng đăng nhập.');
      setUsername(registerData.username);
      setRegisterData({
        username: '',
        fullname: '',
        phone: '',
        email: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
      });
      
      // Auto switch to login after 2 seconds
      setTimeout(() => {
        setFormMode('login');
        setSuccessMessage(null);
      }, 2000);
      
    } catch (err: unknown) {
      console.error('Register error:', err);
      
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string | string[] }; status?: number } };
        if (axiosError.response?.data?.message) {
          const message = axiosError.response.data.message;
          setError(Array.isArray(message) ? message[0] : message);
        } else if (axiosError.response?.status === 409) {
          setError('Tên đăng nhập hoặc email đã tồn tại');
        } else if (axiosError.response?.status === 400) {
          setError('Thông tin đăng ký không hợp lệ');
        } else {
          setError('Đã xảy ra lỗi. Vui lòng thử lại sau');
        }
      } else if (err && typeof err === 'object' && 'request' in err) {
        setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng');
      } else {
        setError('Đã xảy ra lỗi. Vui lòng thử lại sau');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register input change
  const handleRegisterChange = (field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterData(prev => ({ ...prev, [field]: e.target.value }));
    if (error) setError(null);
  };

  // Switch form mode
  const switchToRegister = () => {
    setFormMode('register');
    setError(null);
    setSuccessMessage(null);
  };

  const switchToLogin = () => {
    setFormMode('login');
    setError(null);
    setSuccessMessage(null);
  };

  // Load remembered username on mount
  useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }
  }, []);

  const setFloatIconRef = (index: number) => (el: HTMLDivElement | null) => {
    floatIconRefs.current[index] = el;
  };

  return (
    <div className="login-page">
      {/* 1. LOADING SCREEN */}
      <div id="loader" ref={loaderRef}>
        <div className="relative">
          <img
            src="https://i.postimg.cc/TYfqzW1j/Roxios-ELogo.png"
            alt="RoxiosE Logo"
            className="loader-logo"
            ref={loaderLogoRef}
          />
          <div className="loader-text" ref={loaderTextRef}>
            <p>RISE & EXPLORE</p>
            <p>VƯƠN LÊN VÀ KHÁM PHÁ</p>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="main-content">
        {/* Floating Icons */}
        <div className="decor-element glass-card float-icon-1" ref={setFloatIconRef(0)}>
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div className="decor-element glass-card float-icon-2" ref={setFloatIconRef(1)}>
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <div className="decor-element glass-card float-icon-3" ref={setFloatIconRef(2)}>
          <Globe className="w-8 h-8 text-white" />
        </div>
        <div className="decor-element glass-card float-icon-4" ref={setFloatIconRef(3)}>
          <Languages className="w-8 h-8 text-white" />
        </div>
        <div className="decor-element glass-card float-icon-5" ref={setFloatIconRef(4)}>
          <Award className="w-8 h-8 text-white" />
        </div>

        {/* Left Side Text */}
        <div className="welcome-text" ref={welcomeTextRef} id="welcome-text">
          <div className="mb-8">
            <img
              src="https://i.postimg.cc/TYfqzW1j/Roxios-ELogo.png"
              alt="RoxiosE"
              className="welcome-logo"
            />
            <h1 className="welcome-title">Chào mừng trở lại!</h1>
            <p className="welcome-description">
              Đăng nhập để tiếp tục hành trình chinh phục tiếng Anh của bạn cùng RoxiosE.
            </p>
          </div>

          <div className="space-y-4">
            <div className="info-card glass-card">
              <div className="info-icon-wrapper">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">1,500+ Học viên</p>
                <p className="info-subtext">Cộng đồng học tập sôi động</p>
              </div>
            </div>
            <div className="info-card glass-card">
              <div className="info-icon-wrapper">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Cam kết đầu ra</p>
                <p className="info-subtext">100% hoàn tiền nếu không đạt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Card */}
        <div className={`glass-form login-form ${formMode === 'register' ? 'register-mode' : ''}`} ref={loginFormRef}>
          {/* Header */}
          <div className="form-header">
            <div className="mobile-logo">
              <img
                src="https://i.postimg.cc/TYfqzW1j/Roxios-ELogo.png"
                alt="RoxiosE"
                className="h-12 w-auto mx-auto"
              />
            </div>
            {formMode === 'login' ? (
              <>
                <h2 className="form-title">Đăng nhập</h2>
                <p className="form-subtitle">Nhập thông tin tài khoản của bạn</p>
              </>
            ) : (
              <>
                <h2 className="form-title">Đăng ký tài khoản</h2>
                <p className="form-subtitle">Tạo tài khoản mới để bắt đầu học</p>
              </>
            )}
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="success-message">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {formMode === 'login' && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="space-y-2">
                <label className="input-label">
                  <User className="w-4 h-4" /> Tên đăng nhập
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  className="input-field"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="input-label">
                  <Lock className="w-4 h-4" /> Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="input-field pr-12"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="remember-forgot">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    className="remember-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="text-slate-600">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="forgot-link">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="submit-button group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    Đăng nhập
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="divider">
                <div className="divider-line"></div>
                <div className="divider-line"></div>
              </div>

              {/* Register Link */}
              <p className="register-link">
                Chưa có tài khoản?{' '}
                <button type="button" onClick={switchToRegister} className="switch-form-btn">
                  Đăng ký ngay
                </button>
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {formMode === 'register' && (
            <form className="space-y-4 register-form-fields" onSubmit={handleRegister}>
              {/* Row 1: Username & Fullname */}
              <div className="form-row">
                <div className="space-y-2 flex-1">
                  <label className="input-label">
                    <User className="w-4 h-4" /> Tên đăng nhập <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="vd: nguyenvana"
                    className="input-field"
                    value={registerData.username}
                    onChange={handleRegisterChange('username')}
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <label className="input-label">
                    <UserPlus className="w-4 h-4" /> Họ và tên <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="input-field"
                    value={registerData.fullname}
                    onChange={handleRegisterChange('fullname')}
                    disabled={isLoading}
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="form-row">
                <div className="space-y-2 flex-1">
                  <label className="input-label">
                    <Mail className="w-4 h-4" /> Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="input-field"
                    value={registerData.email}
                    onChange={handleRegisterChange('email')}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <label className="input-label">
                    <Phone className="w-4 h-4" /> Số điện thoại <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0912345678"
                    className="input-field"
                    value={registerData.phone}
                    onChange={handleRegisterChange('phone')}
                    disabled={isLoading}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Row 3: Date of Birth */}
              <div className="space-y-2">
                <label className="input-label">
                  <Calendar className="w-4 h-4" /> Ngày sinh <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={registerData.dateOfBirth}
                  onChange={handleRegisterChange('dateOfBirth')}
                  disabled={isLoading}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Row 4: Password & Confirm Password */}
              <div className="form-row">
                <div className="space-y-2 flex-1">
                  <label className="input-label">
                    <Lock className="w-4 h-4" /> Mật khẩu <span className="required">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showRegisterPassword ? 'text' : 'password'}
                      placeholder="Tối thiểu 6 ký tự"
                      className="input-field pr-12"
                      value={registerData.password}
                      onChange={handleRegisterChange('password')}
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      disabled={isLoading}
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="input-label">
                    <Lock className="w-4 h-4" /> Xác nhận mật khẩu <span className="required">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu"
                      className="input-field pr-12"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange('confirmPassword')}
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="submit-button group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang đăng ký...
                  </>
                ) : (
                  <>
                    Đăng ký
                    <UserPlus className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Back to Login */}
              <button
                type="button"
                className="back-to-login-btn"
                onClick={switchToLogin}
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại đăng nhập
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
