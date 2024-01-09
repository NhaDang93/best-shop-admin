import PortSaleLayout from '@/layouts/PortSaleLayout';
import { ReactNode } from 'react';

export default function CustomerDetailPage() {
  return <>a</>;
}

CustomerDetailPage.getLayout = (page: ReactNode) => (
  <PortSaleLayout>{page}</PortSaleLayout>
);
