import DetectionFeed from '@/components/DetectionFeed';
import Sidebar from '@/components/Sidebar';

export default function FeedPage() {
  return (
    <div className="flex h-screen bg-[#fafbfc]">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto px-12 py-12">
        <DetectionFeed />
      </main>
    </div>
  );
}
