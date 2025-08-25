import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const txRef = urlParams.get('tx_ref');
        const status = urlParams.get('status');
        const transactionId = urlParams.get('transaction_id');

        if (!txRef) {
          setStatus('failed');
          setMessage('Invalid payment reference');
          setTimeout(() => navigate('/payment/cancel'), 3000);
          return;
        }

        // TODO: Replace with actual API call to verify payment
        const response = await fetch(`/api/payment/verify/${txRef}`);
        const result = await response.json();

        if (result.success && result.data.status === 'successful') {
          setStatus('success');
          setMessage('Payment verified successfully!');
          
          // Store payment details if needed
          localStorage.setItem('paymentSuccess', JSON.stringify({
            txRef,
            transactionId,
            timestamp: new Date().toISOString()
          }));
          
          setTimeout(() => navigate('/payment/success'), 2000);
        } else {
          setStatus('failed');
          setMessage('Payment verification failed');
          setTimeout(() => navigate('/payment/cancel'), 3000);
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage('Unable to verify payment');
        setTimeout(() => navigate('/payment/cancel'), 3000);
      }
    };

    verifyPayment();
  }, [navigate]);

  const getIcon = () => {
    switch (status) {
      case 'verifying':
        return <Loader2 className="w-8 h-8 animate-spin text-primary" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-success" />;
      case 'failed':
        return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'verifying':
        return 'from-primary/10 to-background';
      case 'success':
        return 'from-success/10 to-background';
      case 'failed':
        return 'from-destructive/10 to-background';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getStatusColor()}`}>
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto p-8 text-center shadow-elegant">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-background flex items-center justify-center">
            {getIcon()}
          </div>
          
          <h1 className="text-xl font-bold mb-4">
            {status === 'verifying' && 'Processing Payment'}
            {status === 'success' && 'Payment Successful'}
            {status === 'failed' && 'Payment Failed'}
          </h1>
          
          <p className="text-muted-foreground mb-6">{message}</p>
          
          {status === 'verifying' && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-4">
            Please do not close this window...
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCallback;