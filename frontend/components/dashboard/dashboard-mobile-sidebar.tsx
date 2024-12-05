import Sidebar from './dashboard-sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Sheet from '../common/sheet';

const TriggerButton = (
  <Button variant='outline' size='icon' className='md:hidden'>
    <Menu className='h-5 w-5' />
  </Button>
);

export default function MobileSidebar() {
  return (
    <Sheet
      //hideClose
      side='left'
      className='w-[220px] lg:w-[280px]'
      trigger={TriggerButton}
    >
      <Sidebar isMobile={true} />
    </Sheet>
  );
}
