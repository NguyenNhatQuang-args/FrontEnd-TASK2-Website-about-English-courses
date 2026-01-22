import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/api/userApi';
import { STORAGE_KEYS, ROUTES, MESSAGES } from '@/constants';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        email: email.trim(),
        password
      };

      const data = await userApi.login(payload);
      
      localStorage.setItem(STORAGE_KEYS.accessToken, data.token);
      navigate(ROUTES.myCourses);
    } catch (err: any) {
      setError(err.message || MESSAGES.error.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form 
        onSubmit={handleLogin} 
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Đăng Nhập</h2>
        
        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Mật khẩu</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 mt-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Đang xác thực...' : 'ĐĂNG NHẬP'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;