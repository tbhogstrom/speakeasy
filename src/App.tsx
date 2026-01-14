import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { SLPDashboard } from '@/pages/SLPDashboard';
import { StudentsView } from '@/pages/StudentsView';
import { StudentDetailView } from '@/pages/StudentDetailView';
import { EvalsView } from '@/pages/EvalsView';
import { IEPsView } from '@/pages/IEPsView';
import { BillingView } from '@/pages/BillingView';
import { MaterialsView } from '@/pages/MaterialsView';
import { ScreeningsView } from '@/pages/ScreeningsView';
import { MeetingsView } from '@/pages/MeetingsView';
import { TrainingView } from '@/pages/TrainingView';
import { FAQView } from '@/pages/FAQView';
import { PrivacyModeProvider } from '@/contexts/PrivacyModeContext';

function App() {
  return (
    <PrivacyModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<SLPDashboard />} />
            <Route path="students" element={<StudentsView />} />
            <Route path="students/:studentId" element={<StudentDetailView />} />
            <Route path="evals" element={<EvalsView />} />
            <Route path="ieps" element={<IEPsView />} />
            <Route path="billing" element={<BillingView />} />
            <Route path="materials" element={<MaterialsView />} />
            <Route path="screenings" element={<ScreeningsView />} />
            <Route path="meetings" element={<MeetingsView />} />
            <Route path="training" element={<TrainingView />} />
            <Route path="faq" element={<FAQView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PrivacyModeProvider>
  );
}

export default App;