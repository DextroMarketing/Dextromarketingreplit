import { useState, useEffect } from 'react';
import { Phone, PhoneCall, X } from 'lucide-react';
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

type CallState = 'idle' | 'setup' | 'connecting' | 'active' | 'ended';

declare global {
  interface Window {
    Vapi: any;
  }
}

export default function CustomVapiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [callState, setCallState] = useState<CallState>('idle');
  const [countryCode, setCountryCode] = useState('+44');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vapi, setVapi] = useState<any>(null);

  useEffect(() => {
    let cleanupFunction: (() => void) | null = null;

    // Initialize Vapi client
    const initVapi = async () => {
      try {
        // Import Vapi from the web package
        const { default: Vapi } = await import('@vapi-ai/web');
        const vapiInstance = new Vapi('36530774-8f0e-467f-8c57-1700b2e778ae');
        
        // Set up event listeners
        const handleCallStart = () => {
          console.log('Call started');
          setCallState('active');
        };

        const handleCallEnd = () => {
          console.log('Call ended');
          setCallState('ended');
          setTimeout(() => {
            setCallState('idle');
            setIsOpen(false);
          }, 2000);
        };

        const handleError = (error: any) => {
          console.error('Vapi error:', error);
          setCallState('idle');
        };

        vapiInstance.on('call-start', handleCallStart);
        vapiInstance.on('call-end', handleCallEnd);
        vapiInstance.on('error', handleError);

        setVapi(vapiInstance);

        // Store cleanup function
        cleanupFunction = () => {
          vapiInstance.off('call-start', handleCallStart);
          vapiInstance.off('call-end', handleCallEnd);
          vapiInstance.off('error', handleError);
        };
      } catch (error) {
        console.error('Failed to initialize Vapi:', error);
      }
    };

    initVapi();
    
    // Return cleanup function
    return () => {
      if (cleanupFunction) {
        cleanupFunction();
      }
    };
  }, []);

  const startCall = async () => {
    if (!vapi) return;

    try {
      setCallState('connecting');
      
      // Start browser-based voice call with the assistant ID
      // Note: This is a browser voice call, not a phone call to the entered number
      await vapi.start('4050a1a9-8faf-4234-8ac3-b75203b1abb2', {
        variableValues: {
          userPhoneNumber: phoneNumber ? countryCode + phoneNumber : undefined
        }
      });
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallState('idle');
    }
  };

  const endCall = () => {
    if (vapi && callState === 'active') {
      vapi.stop();
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
          <CardTitle className="text-lg font-semibold">Talk with AI</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            data-testid="button-close-vapi-widget"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {callState === 'idle' && (
            <>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Enter your phone number to start a voice call with our AI assistant.
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
                  onClick={startCall}
                  disabled={!phoneNumber.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  data-testid="button-start-call"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Start Call
                </Button>
              </div>
            </>
          )}

          {callState === 'connecting' && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Connecting your call...
              </div>
            </div>
          )}

          {callState === 'active' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <PhoneCall className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-sm font-medium mb-2">Call Active</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                Connected to {countryCode} {phoneNumber}
              </div>
              <Button
                onClick={endCall}
                variant="destructive"
                size="sm"
                data-testid="button-end-call"
              >
                End Call
              </Button>
            </div>
          )}

          {callState === 'ended' && (
            <div className="text-center py-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Call ended. Thank you for using our AI assistant!
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}