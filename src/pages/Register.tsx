import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Smartphone, User, Building, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/lib/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    whatsappNumber: '',
    language: '',
    businessType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    'Restaurant', 'Retail Store', 'E-commerce', 'Healthcare', 'Education',
    'Real Estate', 'Professional Services', 'Manufacturing', 'Other'
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pcm', name: 'Nigerian Pidgin', flag: '🇳🇬' },
    { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.whatsappNumber) newErrors.whatsappNumber = 'WhatsApp number is required';
    else if (!/^(\+234|0)[789][01]\d{8}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Enter valid Nigerian number (+234 or 0)';
    }
    
    if (!formData.language) newErrors.language = 'Preferred language is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Register user with real API
      const result = await registerUser({
        businessName: formData.businessName,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber,
        language: formData.language,
        businessType: formData.businessType
      });
      
      if (result.success) {
        // Store user data for navigation
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        
        // Navigate to WhatsApp connection
        navigate('/connect-whatsapp');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: error instanceof Error ? error.message : 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Auto-format Nigerian phone numbers
    let cleaned = value.replace(/\D/g, '');
    
    if (cleaned.startsWith('234')) {
      cleaned = '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
      cleaned = '+234' + cleaned.slice(1);
    } else if (cleaned.length === 10) {
      cleaned = '+234' + cleaned;
    }
    
    return cleaned;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-elegant">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Start Your Free Trial</h1>
              <p className="text-muted-foreground">Set up your WhatsApp AI in 60 seconds</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  placeholder="Enter your business name"
                  className={errors.businessName ? 'border-destructive' : ''}
                />
                {errors.businessName && (
                  <p className="text-destructive text-sm mt-1">{errors.businessName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your@email.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="whatsappNumber">WhatsApp Business Number *</Label>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  inputMode="numeric"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({...formData, whatsappNumber: formatPhoneNumber(e.target.value)})}
                  placeholder="+234 801 234 5678"
                  className={errors.whatsappNumber ? 'border-destructive' : ''}
                />
                {errors.whatsappNumber && (
                  <p className="text-destructive text-sm mt-1">{errors.whatsappNumber}</p>
                )}
              </div>

              <div>
                <Label htmlFor="language">Preferred Language *</Label>
                <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                  <SelectTrigger className={errors.language ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your preferred language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.language && (
                  <p className="text-destructive text-sm mt-1">{errors.language}</p>
                )}
              </div>

              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                  <SelectTrigger className={errors.businessType ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.businessType && (
                  <p className="text-destructive text-sm mt-1">{errors.businessType}</p>
                )}
              </div>

              {errors.general && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-destructive text-sm">{errors.general}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Setting up your account...
                  </>
                ) : (
                  <>
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">What happens next?</h4>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Connect your WhatsApp Business account</li>
                    <li>• AI assistant will be deployed instantly</li>
                    <li>• Start with 60 free messages</li>
                    <li>• Test all languages and voice features</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;