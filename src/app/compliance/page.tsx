import Sidebar from '@/components/Sidebar';
import ComplianceLog from '@/components/ComplianceLog';

export default function CompliancePage() {
  return (
    <div className="flex h-screen bg-[#fafbfc]">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto px-12 py-12">
        <ComplianceLog />
      </main>
    </div>
  );
}
