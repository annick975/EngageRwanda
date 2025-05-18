import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginCitizen } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
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
      const response = await loginCitizen({
        email: formData.email,
        password: formData.password,
      });

      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        setUser(response);
        navigate('/complaints');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Citizen Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Create a new account
          </Link>
          {' '} | {' '}
          <Link to="/admin/login" className="font-medium text-blue-600 hover:text-blue-500">
            Admin Login
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
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
                Sign in as Citizen
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 