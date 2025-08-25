import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smartphone, QrCode, CheckCircle, ArrowRight, RefreshCw, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConnectWhatsApp = () => {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStep, setConnectionStep] = useState(1);
  const [userRegistration, setUserRegistration] = useState<any>(null);

  useEffect(() => {
    // Get user registration data
    const userData = localStorage.getItem('userRegistration');
    if (userData) {
      setUserRegistration(JSON.parse(userData));
    }
    
    // Auto-generate QR code on component mount
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    setIsGenerating(true);
    
    try {
      // TODO: Replace with actual WhatsApp Web API integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock QR code data
      const mockQRData = `whatsapp://connect?token=${Date.now()}&user=${userRegistration?.businessName || 'business'}`;
      setQrCode(mockQRData);
      
      // Start checking for connection
      checkConnectionStatus();
    } catch (error) {
      console.error('QR generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const checkConnectionStatus = () => {
    // Simulate connection check every 3 seconds
    const interval = setInterval(() => {
      // In real implementation, this would check server for connection status
      const randomConnection = Math.random() > 0.7; // 30% chance of connection per check
      
      if (randomConnection) {
        setIsConnected(true);
        setConnectionStep(4);
        clearInterval(interval);
        
        // Auto-redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    }, 3000);

    // Clear interval after 2 minutes to prevent infinite checking
    setTimeout(() => clearInterval(interval), 120000);
  };

  const QRCodeDisplay = () => {
    if (isGenerating) {
      return (
        <div className="w-64 h-64 mx-auto bg-accent rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Generating QR Code...</p>
          </div>
        </div>
      );
    }

    if (isConnected) {
      return (
        <div className="w-64 h-64 mx-auto bg-success/10 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <p className="text-lg font-semibold text-success">Connected!</p>
            <p className="text-sm text-muted-foreground">WhatsApp Business linked</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-64 h-64 mx-auto bg-white rounded-2xl flex items-center justify-center border-2 border-primary/20">
        <div className="grid grid-cols-8 gap-1 p-4">
          {[...Array(64)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 ${
                Math.random() > 0.5 ? 'bg-primary' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Connect Your WhatsApp Business</h1>
            <p className="text-muted-foreground">
              Scan the QR code with your WhatsApp Business app to activate your AI assistant
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* QR Code Section */}
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-6">Scan QR Code</h3>
              
              <QRCodeDisplay />

              <div className="mt-6">
                {!isConnected && (
                  <Button 
                    variant="outline"
                    onClick={generateQRCode}
                    disabled={isGenerating}
                    className="w-full"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Generating...' : 'Generate New QR'}
                  </Button>
                )}
              </div>
            </Card>

            {/* Instructions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Step-by-Step Instructions</h3>
              
              <div className="space-y-4">
                <div className={`flex items-start gap-4 p-4 rounded-lg ${connectionStep >= 1 ? 'bg-primary/10' : 'bg-muted/50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    connectionStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Open WhatsApp Business</h4>
                    <p className="text-muted-foreground text-sm">Launch WhatsApp Business on your mobile device</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 p-4 rounded-lg ${connectionStep >= 2 ? 'bg-primary/10' : 'bg-muted/50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    connectionStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Access Linked Devices</h4>
                    <p className="text-muted-foreground text-sm">Tap Menu (⋮) → Linked Devices → Link a Device</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 p-4 rounded-lg ${connectionStep >= 3 ? 'bg-primary/10' : 'bg-muted/50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    connectionStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Scan QR Code</h4>
                    <p className="text-muted-foreground text-sm">Point your camera at the QR code above</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 p-4 rounded-lg ${connectionStep >= 4 ? 'bg-success/10' : 'bg-muted/50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    connectionStep >= 4 ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {connectionStep >= 4 ? <CheckCircle className="w-4 h-4" /> : '4'}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">AI Assistant Active</h4>
                    <p className="text-muted-foreground text-sm">Your AI assistant is now responding to customers</p>
                  </div>
                </div>
              </div>

              {isConnected && (
                <Card className="p-6 bg-success/5 border-success/20">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <h4 className="font-semibold text-success">Successfully Connected!</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your WhatsApp Business is now powered by OdiaBiz AI. You can start receiving and responding to customer messages automatically in {userRegistration?.language || 'multiple languages'}.
                  </p>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full"
                    >
                      View Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      Redirecting automatically in 3 seconds...
                    </p>
                  </div>
                </Card>
              )}

              {!isConnected && (
                <Card className="p-4 bg-yellow-50 border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Having trouble?</strong> Make sure you're using WhatsApp Business (not regular WhatsApp) 
                    and that you have a stable internet connection.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWhatsApp;