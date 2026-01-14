import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Eye, EyeOff } from 'lucide-react';
import { usePrivacyMode } from '@/contexts/PrivacyModeContext';

export function AppLayout() {
  const { privacyMode, togglePrivacyMode } = usePrivacyMode();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4">
        <div className="flex items-center mb-6">
          <MessageCircle className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-xl font-bold">SpeakEasy</h1>
        </div>
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar with Privacy Toggle */}
        <div className="border-b bg-card px-8 py-3 flex items-center justify-end gap-3">
          <Button
            variant={privacyMode ? 'default' : 'outline'}
            size="sm"
            onClick={togglePrivacyMode}
            className="gap-2"
          >
            {privacyMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            Privacy Mode
          </Button>
          {privacyMode && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              PII Hidden
            </Badge>
          )}
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1">
          <main className="p-8">
            <Outlet />
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}