import Dashboard from '@/components/dashboard';
import DashboardContentSkeleton from '@/components/skeleton/dashboard-content-skeleton';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dashboard>
      <Suspense fallback={<DashboardContentSkeleton />}>{children}</Suspense>{' '}
    </Dashboard>
  );
}
