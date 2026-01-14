import { Link, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  ClipboardCheck,
  FileText,
  DollarSign,
  Package,
  UserCheck,
  Calendar,
  Users,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/students', icon: Users, label: 'Students' },
    { path: '/evals', icon: ClipboardCheck, label: 'Evaluations' },
    { path: '/ieps', icon: FileText, label: 'IEPs' },
    { path: '/billing', icon: DollarSign, label: 'Billing' },
    { path: '/materials', icon: Package, label: 'Materials' },
    { path: '/screenings', icon: UserCheck, label: 'Screenings' },
    { path: '/meetings', icon: Calendar, label: 'Meetings' },
  ];

  const helpItems = [
    { path: '/training', icon: BookOpen, label: 'Training' },
    { path: '/faq', icon: HelpCircle, label: 'FAQ' },
  ];

  return (
    <>
      <nav className="flex flex-col space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center px-4 py-2 rounded-md hover:bg-accent transition-colors ${
              location.pathname === path ? 'bg-accent' : ''
            }`}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <Separator className="my-4" />
      <nav className="flex flex-col space-y-2">
        {helpItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center px-4 py-2 rounded-md hover:bg-accent transition-colors ${
              location.pathname === path ? 'bg-accent' : ''
            }`}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}