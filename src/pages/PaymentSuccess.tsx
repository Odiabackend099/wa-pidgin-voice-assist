import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [planDetails, setPlanDetails] = useState({
    name: 'Professional Plan',
    price: '₦15,000',
    period: 'month',
    features: ['5,000 messages', 'Voice replies', 'All languages', 'Analytics dashboard']
  });

  useEffect(() => {
    // Get payment details from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const txRef = urlParams.get('tx_ref');
    const status = urlParams.get('status');
    
    // TODO: Verify payment with backend
    if (txRef && status === 'successful') {
      // Payment verified - could fetch actual plan details here
    }

    // Countdown timer for auto-redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/10 to-background">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto p-8 text-center shadow-elegant">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Payment Successful! 🎉</h1>
          <p className="text-muted-foreground mb-6">Your OdiaBiz AI plan is now active</p>
          
          <Card className="bg-success/5 border-success/20 p-4 mb-6">
            <h3 className="font-semibold text-success mb-2">Plan Activated</h3>
            <p className="text-success/80">{planDetails.name} - {planDetails.price}/{planDetails.period}</p>
            <div className="text-sm text-success/70 mt-2">
              {planDetails.features.map((feature, index) => (
                <div key={index}>• {feature}</div>
              ))}
            </div>
          </Card>

          <p className="text-sm text-muted-foreground mb-6">
            Start sending WhatsApp messages to your customers now!
          </p>
          
          <Button 
            onClick={handleGoToDashboard}
            className="w-full"
            size="lg"
          >
            Go to Dashboard <ArrowRight className="inline w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Redirecting automatically in {countdown}s...
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;