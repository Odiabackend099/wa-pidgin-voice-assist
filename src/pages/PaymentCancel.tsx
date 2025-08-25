import React, { useEffect } from 'react';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Log cancellation event for analytics
    const urlParams = new URLSearchParams(window.location.search);
    const txRef = urlParams.get('tx_ref');
    
    if (txRef) {
      // TODO: Log cancellation with backend analytics
      console.log('Payment cancelled:', txRef);
    }
  }, []);

  const handleTryAgain = () => {
    navigate('/', { state: { showPricing: true } });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/10 to-background">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto p-8 text-center shadow-elegant">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
          <p className="text-muted-foreground mb-6">
            Your payment was cancelled. No charges were made to your account.
          </p>
          
          <Card className="bg-muted/50 border-muted p-4 mb-6">
            <h3 className="font-semibold mb-2">What happened?</h3>
            <p className="text-sm text-muted-foreground">
              The payment process was interrupted or cancelled. This could be due to:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 text-left">
              <li>• Payment window was closed</li>
              <li>• Network connectivity issues</li>
              <li>• Payment method declined</li>
              <li>• Manual cancellation</li>
            </ul>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={handleTryAgain}
              className="w-full"
              size="lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Payment Again
            </Button>
            
            <Button 
              onClick={handleGoHome}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Need help? Contact our support team at support@odiabizai.odia.dev
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCancel;