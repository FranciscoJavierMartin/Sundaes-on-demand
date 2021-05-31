import React from 'react';
import { Alert } from 'react-bootstrap';

interface AlertBannerProps {
  message?: string;
  variant?: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({
  message = 'An unexpected error occurred. Please try again later.',
  variant = 'danger',
}) => {
  return (
    <Alert variant={variant} style={{ backgroundColor: 'red' }}>
      {message}
    </Alert>
  );
};

export default AlertBanner;
