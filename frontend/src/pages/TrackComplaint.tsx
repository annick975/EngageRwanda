import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getComplaintByTicketId } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const TrackComplaint: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [searchTicketId, setSearchTicketId] = useState(ticketId || '');
  const [complaint, setComplaint] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ticketId) {
      setSearchTicketId(ticketId);
      handleSearch();
    }
  }, [ticketId]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTicketId) return;

    setIsLoading(true);
    setError('');

    try {
      const data = await getComplaintByTicketId(searchTicketId);
      setComplaint(data);
    } catch (err) {
      setError('Complaint not found. Please check the ticket ID and try again.');
      setComplaint(null);
    } finally {
      setIsLoading(false);
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

  const isRecentlyUpdated = (updateDate: string) => {
    const updated = new Date(updateDate);
    const now = new Date();
    const hoursDiff = (now.getTime() - updated.getTime()) / (1000 * 60 * 60);
    return hoursDiff < 24;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Track Your Complaint
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your complaint ticket ID to check its status
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSearch} className="space-y-6">
            <Input
              label="Ticket ID"
              id="ticketId"
              name="ticketId"
              type="text"
              required
              value={searchTicketId}
              onChange={(e) => setSearchTicketId(e.target.value)}
              placeholder="Enter your complaint ticket ID"
            />

            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Track Complaint
              </Button>
            </div>
          </form>

          {error && (
            <div className="mt-4 text-red-600 text-sm">{error}</div>
          )}

          {complaint && (
            <div className="mt-8 border-t border-gray-200 pt-8">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Ticket ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {complaint.ticketId}
                  </dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                    {isRecentlyUpdated(complaint.updatedAt) && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Updated
                      </span>
                    )}
                  </dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {complaint.category}
                  </dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Agency</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {complaint.agencyName}
                  </dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {complaint.description}
                  </dd>
                </div>

                {complaint.responseMessage && (
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Response
                      {isRecentlyUpdated(complaint.updatedAt) && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          New
                        </span>
                      )}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                      {complaint.responseMessage}
                    </dd>
                  </div>
                )}

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Submitted</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(complaint.createdAt).toLocaleString()}
                  </dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(complaint.updatedAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackComplaint; 