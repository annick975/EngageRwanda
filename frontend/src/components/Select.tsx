import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  options: Option[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  onChange,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <select
          className={`
            w-full px-3 py-2.5 rounded-lg border-2 shadow-sm
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 focus:border-blue-500
            appearance-none bg-white
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            ${icon ? 'pl-10' : 'pl-3'}
            ${className}
          `}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select; 