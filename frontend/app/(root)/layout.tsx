import Footer from '@/components/common/footer';
import Navbar from '@/components/navbar';
import PageSkeleton from '@/components/skeleton/page-skeleton';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen '>
      {/*h-[68px]*/}
      <Navbar />
      <main className='container mx-auto flex-1 pt-10 pb-20'>
        <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
      </main>
      {/*h-[60px]*/}
      <Footer />
    </div>
  );
}
