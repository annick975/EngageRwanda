import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAdminComplaints, updateComplaintStatus } from '../services/api';
import Button from '../components/Button';
import StatusUpdateModal from '../components/StatusUpdateModal';
import { Complaint, isAdminAuth, StatusUpdateRequest } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  useEffect(() => {
    console.log('AdminDashboard mounted, auth state:', { 
      isAuthenticated, 
      userRole: user?.role 
    });
    
    // More flexible role checking
    const isAdmin = isAuthenticated && (user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN');
    
    if (!isAdmin) {
      console.log('User is not admin, redirecting to login');
      navigate('/admin/login');
      return;
    }

    fetchComplaints();
  }, [isAuthenticated, user, navigate]);

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');
      const data = await getAdminComplaints();
      console.log('Fetched admin complaints:', data);
      setComplaints(data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setError('Failed to load complaints');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (complaintId: number, data: StatusUpdateRequest) => {
    try {
      setError('');
      const updatedComplaint = await updateComplaintStatus(complaintId, data);
      await fetchComplaints();
      setSuccessMessage(`Complaint ${updatedComplaint.ticketId} has been updated to ${updatedComplaint.status} successfully.`);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
      return Promise.resolve();
    } catch (err) {
      setError('Failed to update complaint status');
      return Promise.reject(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Admin Dashboard
          </h2>
          {user && isAdminAuth(user) && (
            <p className="mt-2 text-lg text-gray-600">
              Agency: <span className="font-medium">{user.agencyName}</span>
            </p>
          )}
          <p className="mt-2 text-sm text-gray-600">
            Manage and respond to citizen complaints for your agency
          </p>
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200">{error}</div>
        )}

        {successMessage && (
          <div className="mt-4 text-green-600 text-sm text-center bg-green-50 p-3 rounded-md border border-green-200">{successMessage}</div>
        )}

        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {complaints.length === 0 && !isLoading ? (
                  <div className="bg-white py-12 px-6 text-center">
                    <svg 
                      className="mx-auto h-12 w-12 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No complaints found</h3>
                    <p className="mt-1 text-gray-500">
                      There are currently no complaints assigned to your agency in the system.
                    </p>
                    {error && (
                      <p className="mt-3 text-sm text-red-600">
                        Note: There was an error fetching complaints. The API endpoint may not be available.
                      </p>
                    )}
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ticket ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Citizen
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {complaints.map((complaint) => (
                        <tr key={complaint.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {complaint.ticketId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.name} ({complaint.email})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                              {complaint.status}
                            </span>
                            {complaint.responseMessage && (
                              <div className="mt-1">
                                <span 
                                  className="text-xs text-gray-500 cursor-pointer hover:text-gray-700"
                                  title={complaint.responseMessage}
                                >
                                  Response provided
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(complaint.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => setSelectedComplaint(complaint)}
                            >
                              Update Status
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        {selectedComplaint && (
          <StatusUpdateModal
            complaint={selectedComplaint}
            onClose={() => setSelectedComplaint(null)}
            onSubmit={handleStatusUpdate}
            statusOptions={statusOptions}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 