import { createContext, useContext, useState, ReactNode } from 'react';

interface PrivacyModeContextType {
  privacyMode: boolean;
  togglePrivacyMode: () => void;
  maskPII: (text: string | undefined, type?: 'name' | 'id' | 'date' | 'teacher') => string;
}

const PrivacyModeContext = createContext<PrivacyModeContextType | undefined>(undefined);

export function PrivacyModeProvider({ children }: { children: ReactNode }) {
  const [privacyMode, setPrivacyMode] = useState(false);

  const togglePrivacyMode = () => {
    setPrivacyMode(!privacyMode);
  };

  const maskPII = (text: string | undefined, type: 'name' | 'id' | 'date' | 'teacher' = 'name'): string => {
    if (!privacyMode || !text) return text || '—';

    switch (type) {
      case 'name':
        // Replace with "Student A", "Student B", etc. or generic name
        return 'Student ***';
      case 'teacher':
        return 'Teacher ***';
      case 'id':
        return '***********';
      case 'date':
        return '**/**/****';
      default:
        return '***';
    }
  };

  return (
    <PrivacyModeContext.Provider value={{ privacyMode, togglePrivacyMode, maskPII }}>
      {children}
    </PrivacyModeContext.Provider>
  );
}

export function usePrivacyMode() {
  const context = useContext(PrivacyModeContext);
  if (context === undefined) {
    throw new Error('usePrivacyMode must be used within a PrivacyModeProvider');
  }
  return context;
}
