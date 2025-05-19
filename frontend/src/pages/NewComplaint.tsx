import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createComplaint, createAuthenticatedComplaint, getAllAgencies } from '../services/api';
import { isCitizenAuth } from '../types';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';
import { Agency } from '../types';

const NewComplaint: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    description: '',
    agencyName: '',
  });

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const data = await getAllAgencies();
        setAgencies(data);
      } catch (err) {
        setError('Failed to load agencies');
      }
    };

    fetchAgencies();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user && isCitizenAuth(user)) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [isAuthenticated, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleAgencyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      agencyName: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = isAuthenticated
        ? await createAuthenticatedComplaint(formData)
        : await createComplaint(formData);

      navigate(`/complaints/track/${response.ticketId}`);
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { value: 'Infrastructure', label: 'Infrastructure' },
    { value: 'Public Services', label: 'Public Services' },
    { value: 'Environment', label: 'Environment' },
    { value: 'Safety', label: 'Safety' },
    { value: 'Other', label: 'Other' },
  ];

  const agencyOptions = agencies.map((agency) => ({
    value: agency.name,
    label: agency.name,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Submit a New Complaint
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the form below to submit your complaint. We'll make sure it reaches the right authorities.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Full name"
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isAuthenticated}
              />

              <Input
                label="Email address"
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isAuthenticated}
              />
            </div>

            <Select
              label="Category"
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleCategoryChange}
              options={categoryOptions}
            />

            <Select
              label="Agency"
              id="agencyName"
              name="agencyName"
              required
              value={formData.agencyName}
              onChange={handleAgencyChange}
              options={agencyOptions}
            />

            <TextArea
              label="Description"
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Please provide detailed information about your complaint..."
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
                Submit Complaint
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewComplaint; 