import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          404 - Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted leading-relaxed">
          The academic module or view you are attempting to access does not exist or has
          been moved.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Link to="/dashboard">
            <Button variant="primary" size="md" icon={Home}>
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
