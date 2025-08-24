import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smartphone, QrCode, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';

const WhatsAppQR = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateQR = () => {
    setIsLoading(true);
    // Simulate QR generation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const simulateConnection = () => {
    setIsConnected(true);
  };

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect Your <span className="text-primary">WhatsApp Business</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scan the QR code with your WhatsApp Business account to instantly deploy your AI assistant.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* QR Code Section */}
            <Card className="p-8 text-center shadow-elegant">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Scan QR Code</h3>
                
                {!isConnected ? (
                  <div className="w-64 h-64 mx-auto bg-accent rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {isLoading ? (
                      <div className="flex flex-col items-center gap-4">
                        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-sm text-muted-foreground">Generating QR Code...</p>
                      </div>
                    ) : (
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
                    )}
                  </div>
                ) : (
                  <div className="w-64 h-64 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold text-primary">Connected!</p>
                      <p className="text-sm text-muted-foreground">WhatsApp Business linked</p>
                    </div>
                  </div>
                )}
              </div>

              {!isConnected && (
                <Button 
                  variant="outline" 
                  onClick={generateQR}
                  disabled={isLoading}
                  className="w-full"
                >
                  <QrCode className="w-4 h-4" />
                  {isLoading ? 'Generating...' : 'Generate New QR'}
                </Button>
              )}
            </Card>

            {/* Instructions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">How to Connect</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Open WhatsApp Business</h4>
                    <p className="text-muted-foreground text-sm">Launch WhatsApp Business on your phone</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Scan QR Code</h4>
                    <p className="text-muted-foreground text-sm">Tap Menu → Linked Devices → Link a Device</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Start Using AI</h4>
                    <p className="text-muted-foreground text-sm">Your AI assistant is now active on WhatsApp</p>
                  </div>
                </div>
              </div>

              {!isConnected && (
                <Button 
                  variant="cta" 
                  className="w-full"
                  onClick={simulateConnection}
                >
                  <Smartphone className="w-4 h-4" />
                  Simulate Connection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {isConnected && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Successfully Connected!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your WhatsApp Business is now powered by OdiaBiz AI. You can start receiving and responding to customer messages automatically.
                  </p>
                  
                  <Button variant="default" className="mt-4 w-full">
                    View Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppQR;