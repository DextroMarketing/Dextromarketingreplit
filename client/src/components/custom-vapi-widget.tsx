import { useState } from 'react';
import { Phone, Send, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Country codes for phone number selection
const countryCodes = [
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
];

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function CustomVapiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [countryCode, setCountryCode] = useState('+44');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitPhoneNumber = async () => {
    if (!phoneNumber.trim()) return;

    try {
      setSubmissionState('submitting');
      setErrorMessage('');
      
      const fullPhoneNumber = countryCode + phoneNumber.trim();
      const response = await fetch('/api/dxm-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: fullPhoneNumber
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Phone number saved successfully:', result.submissionId);
        setSubmissionState('success');
        setPhoneNumber('');
        setTimeout(() => {
          setSubmissionState('idle');
          setIsOpen(false);
        }, 2000);
      } else {
        console.error('Failed to save phone number:', result.message);
        setErrorMessage(result.message || 'Failed to save phone number');
        setSubmissionState('error');
      }
    } catch (saveError) {
      console.error('Error saving phone number:', saveError);
      setErrorMessage('Network error. Please try again.');
      setSubmissionState('error');
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:scale-105"
          data-testid="button-open-vapi-widget"
        >
          <Phone className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="w-80 bg-white dark:bg-gray-800 shadow-xl border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Request Callback</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsOpen(false);
              setSubmissionState('idle');
              setErrorMessage('');
            }}
            data-testid="button-close-vapi-widget"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {submissionState === 'idle' && (
            <>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Enter your phone number and we'll contact you to discuss how our AI can help your business.
              </div>
              
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-24" data-testid="select-country-code">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center space-x-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                    data-testid="input-phone-number"
                  />
                </div>
                
                <Button
                  onClick={submitPhoneNumber}
                  disabled={!phoneNumber.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  data-testid="button-submit-phone"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Request Callback
                </Button>
              </div>
            </>
          )}

          {submissionState === 'submitting' && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Saving your details...
              </div>
            </div>
          )}

          {submissionState === 'success' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-sm font-medium mb-2">Success!</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                We've received your number and will contact you soon.
              </div>
            </div>
          )}

          {submissionState === 'error' && (
            <div className="space-y-3">
              <div className="text-center py-2">
                <div className="text-sm text-red-600 dark:text-red-400 mb-2">
                  {errorMessage}
                </div>
                <Button
                  onClick={() => setSubmissionState('idle')}
                  variant="outline"
                  size="sm"
                  data-testid="button-try-again"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}