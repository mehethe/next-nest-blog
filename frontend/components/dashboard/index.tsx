import Header from './dashboard-header';
import Sidebar from './dashboard-sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar />
      <div className='flex flex-col'>
        <Header />
        <main>
          <ScrollArea className='h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-60px)] p-4 lg:p-6'>
            {children}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
