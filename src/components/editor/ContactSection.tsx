import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Linkedin, ExternalLink, X } from 'lucide-react';

interface ContactDetails {
  email: { url: string; text: string };
  phone: { url: string; text: string };
  linkedin: { url: string; text: string };
}

interface ContactSectionProps {
  contactDetails: ContactDetails;
  onContactChange: (details: ContactDetails) => void;
}

export default function ContactSection({ contactDetails, onContactChange }: ContactSectionProps) {
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsEditingUrl(false);
        setActiveContact(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleContactClick = (type: string, defaultUrl: string, defaultText: string) => {
    // Close any other open tooltips before opening a new one
    if (activeContact && activeContact !== type) {
      setIsEditingUrl(false);
      setActiveContact(null);
    }
    
    if (activeContact === type && isEditingUrl) {
      setIsEditingUrl(false);
      setActiveContact(null);
    } else {
      setActiveContact(type);
      setIsEditingUrl(true);
    }
  };

  const formatDisplayText = (type: string, url: string): string => {
    switch (type) {
      case 'email':
        return url.replace('mailto:', '');
      case 'phone':
        const digits = url.replace(/\D/g, '');
        if (digits.length === 10) {
          return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
        }
        return url.replace('tel:', '');
      case 'linkedin':
        return url.replace(/https:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '');
      default:
        return url;
    }
  };

  const handleUrlChange = (type: string, newUrl: string) => {
    const formattedText = formatDisplayText(type, newUrl);
    onContactChange({
      ...contactDetails,
      [type]: {
        url: newUrl,
        text: formattedText
      }
    });
  };

  const renderContactTooltip = (type: string) => {
    if (activeContact !== type || !isEditingUrl) return null;

    const currentUrl = contactDetails[type as keyof ContactDetails].url;
    const canVisitUrl = currentUrl && (
      type === 'linkedin' ? currentUrl.startsWith('https://') :
      type === 'email' ? currentUrl.startsWith('mailto:') :
      type === 'phone' ? currentUrl.startsWith('tel:') : false
    );

    return (
      <div
        ref={tooltipRef}
        className="absolute bottom-full left-0 z-[var(--z-tooltip)] mb-2 w-full rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/10"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {type === 'email' && <Mail className="h-4 w-4 text-gray-500" />}
            {type === 'phone' && <Phone className="h-4 w-4 text-gray-500" />}
            {type === 'linkedin' && <Linkedin className="h-4 w-4 text-gray-500" />}
          </div>
          <input
            type="text"
            value={contactDetails[type as keyof ContactDetails].url}
            onChange={(e) => handleUrlChange(type, e.target.value)}
            className="flex-1 min-w-0 rounded border border-gray-200 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={
              type === 'email' ? 'mailto:your@email.com' :
              type === 'phone' ? 'tel:+1234567890' :
              'https://linkedin.com/in/profile'
            }
          />
          <div className="flex items-center gap-1 flex-shrink-0">
            {canVisitUrl && (
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                title="Visit link"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <button
              onClick={() => {
                setIsEditingUrl(false);
                setActiveContact(null);
              }}
              className="rounded p-1 hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="absolute -bottom-2 left-4 h-2 w-2 rotate-45 bg-white ring-1 ring-black/10 ring-r-0 ring-t-0"></div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-[var(--spacing-xs)] text-gray-600">
      {['email', 'phone', 'linkedin'].map((type) => (
        <div key={type} className="relative">
          <div
            onClick={() => handleContactClick(
              type,
              type === 'email' ? 'mailto:' :
              type === 'phone' ? 'tel:' :
              'https://linkedin.com/in/',
              contactDetails[type as keyof ContactDetails].text
            )}
            className={`flex cursor-pointer items-center gap-[var(--spacing-xs)] hover:text-blue-600 ${
              activeContact === type ? 'bg-blue-50 text-blue-600' : ''
            } rounded-md p-2 transition-colors`}
            role="button"
            tabIndex={0}
          >
            {type === 'email' && <Mail className="h-4 w-4 flex-shrink-0" />}
            {type === 'phone' && <Phone className="h-4 w-4 flex-shrink-0" />}
            {type === 'linkedin' && <Linkedin className="h-4 w-4 flex-shrink-0" />}
            <span className="truncate">{contactDetails[type as keyof ContactDetails].text}</span>
          </div>
          {renderContactTooltip(type)}
        </div>
      ))}
    </div>
  );
} 