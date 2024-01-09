import { Home } from '@/containers';
import PortSaleLayout from '@/layouts/PortSaleLayout';
import { ReactNode } from 'react';

export default function HomePage() {
  return <Home />;
}

HomePage.getLayout = (page: ReactNode) => (
  <PortSaleLayout>{page}</PortSaleLayout>
);
