import React, { useState } from 'react';
import { Complaint, StatusUpdateRequest } from '../types';
import Button from './Button';
import Select from './Select';
import TextArea from './TextArea';

interface StatusUpdateModalProps {
  complaint: Complaint;
  onClose: () => void;
  onSubmit: (complaintId: number, data: StatusUpdateRequest) => Promise<void>;
  statusOptions: Array<{ value: string; label: string }>;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  complaint,
  onClose,
  onSubmit,
  statusOptions
}) => {
  const [statusUpdate, setStatusUpdate] = useState<StatusUpdateRequest>({
    status: complaint.status,
    responseMessage: complaint.responseMessage || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(complaint.id, statusUpdate);
      onClose();
    } catch (err) {
      setError('Failed to update status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-5">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Update Complaint Status
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500">Ticket ID</p>
              <p className="text-sm font-medium">{complaint.ticketId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Category</p>
              <p className="text-sm font-medium">{complaint.category}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">Current Status</p>
              <p className={`text-sm font-medium inline-block px-2 py-1 rounded-full mt-1 ${getStatusColor(complaint.status)}`}>
                {complaint.status}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">Description</p>
              <p className="text-sm">{complaint.description}</p>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Status"
            options={statusOptions}
            value={statusUpdate.status}
            onChange={(value) => setStatusUpdate(prev => ({ ...prev, status: value }))}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <TextArea
            label="Response Message"
            value={statusUpdate.responseMessage}
            onChange={(e) => setStatusUpdate(prev => ({ ...prev, responseMessage: e.target.value }))}
            rows={4}
            placeholder="Enter your response to the citizen..."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            }
          />
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="px-5"
            >
              Update Status
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal; 