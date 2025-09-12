import { useEffect } from 'react';

interface VapiWidgetProps {
  publicKey: string;
  assistantId: string;
  mode?: 'voice' | 'text';
  theme?: 'light' | 'dark';
  baseBgColor?: string;
  accentColor?: string;
  ctaButtonColor?: string;
  ctaButtonTextColor?: string;
  borderRadius?: 'small' | 'medium' | 'large';
  size?: 'compact' | 'full';
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  title?: string;
  startButtonText?: string;
  endButtonText?: string;
  chatFirstMessage?: string;
  chatPlaceholder?: string;
  voiceShowTranscript?: boolean;
  consentRequired?: boolean;
  consentTitle?: string;
  consentContent?: string;
  consentStorageKey?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vapi-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'public-key'?: string;
        'assistant-id'?: string;
        'mode'?: string;
        'theme'?: string;
        'base-bg-color'?: string;
        'accent-color'?: string;
        'cta-button-color'?: string;
        'cta-button-text-color'?: string;
        'border-radius'?: string;
        'size'?: string;
        'position'?: string;
        'title'?: string;
        'start-button-text'?: string;
        'end-button-text'?: string;
        'chat-first-message'?: string;
        'chat-placeholder'?: string;
        'voice-show-transcript'?: string;
        'consent-required'?: string;
        'consent-title'?: string;
        'consent-content'?: string;
        'consent-storage-key'?: string;
      };
    }
  }
}

export function VapiWidget({
  publicKey,
  assistantId,
  mode = 'voice',
  theme = 'dark',
  baseBgColor = '#000000',
  accentColor = '#004fff',
  ctaButtonColor = '#000000',
  ctaButtonTextColor = '#ffffff',
  borderRadius = 'large',
  size = 'full',
  position = 'bottom-left',
  title = 'TALK WITH AI',
  startButtonText = 'Start',
  endButtonText = 'End Call',
  chatFirstMessage = 'Hey, How can I help you today?',
  chatPlaceholder = 'Type your message...',
  voiceShowTranscript = true,
  consentRequired = true,
  consentTitle = 'Terms and conditions',
  consentContent = 'By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service.',
  consentStorageKey = 'vapi_widget_consent'
}: VapiWidgetProps) {
  useEffect(() => {
    // Ensure the Vapi widget script is loaded
    const checkVapiLoaded = () => {
      if (typeof window !== 'undefined' && (window as any).VapiWidget) {
        console.log('Vapi widget is ready');
      } else {
        setTimeout(checkVapiLoaded, 100);
      }
    };
    
    checkVapiLoaded();
  }, []);

  return (
    <vapi-widget
      public-key={publicKey}
      assistant-id={assistantId}
      mode={mode}
      theme={theme}
      base-bg-color={baseBgColor}
      accent-color={accentColor}
      cta-button-color={ctaButtonColor}
      cta-button-text-color={ctaButtonTextColor}
      border-radius={borderRadius}
      size={size}
      position={position}
      title={title}
      start-button-text={startButtonText}
      end-button-text={endButtonText}
      chat-first-message={chatFirstMessage}
      chat-placeholder={chatPlaceholder}
      voice-show-transcript={voiceShowTranscript.toString()}
      consent-required={consentRequired.toString()}
      consent-title={consentTitle}
      consent-content={consentContent}
      consent-storage-key={consentStorageKey}
      data-testid="vapi-widget"
    />
  );
}