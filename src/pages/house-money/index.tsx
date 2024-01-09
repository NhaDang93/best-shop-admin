import { HouseMoney } from '@/containers';
import PortSaleLayout from '@/layouts/PortSaleLayout';
import { ReactNode } from 'react';

export default function ImportMoneyPage() {
  return <HouseMoney />;
}

ImportMoneyPage.getLayout = (page: ReactNode) => (
  <PortSaleLayout>{page}</PortSaleLayout>
);
