import { Dashboard } from '@/containers';
import PortSaleLayout from '@/layouts/PortSaleLayout';
import { ReactNode } from 'react';

export default function DashboardPage() {
  return <Dashboard />;
}

DashboardPage.getLayout = (page: ReactNode) => (
  <PortSaleLayout>{page}</PortSaleLayout>
);
