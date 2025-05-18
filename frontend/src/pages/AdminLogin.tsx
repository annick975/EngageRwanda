import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginAdmin } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Starting admin login process...');
      const response = await loginAdmin({
        username: formData.username,
        password: formData.password,
      });

      console.log('Admin login response received:', { 
        token: response.token ? 'Present' : 'Missing',
        role: response.role,
        agencyName: response.agencyName 
      });

      if (response && response.token) {
        localStorage.setItem('token', response.token);
        console.log('Token saved to localStorage');
        
        setUser(response);
        console.log('User set in auth context');
        
        console.log('Admin login successful, redirecting to dashboard');
        setTimeout(() => {
          navigate('/admin');
        }, 100);
      } else {
        setError('Invalid credentials or missing token');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message;
        setError(`Login failed: ${errorMessage}`);
        console.error('Login error details:', {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message
        });
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error('Unexpected error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Citizen Login
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Sign in as Admin
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 