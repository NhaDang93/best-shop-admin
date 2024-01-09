import { SpendingMoney } from '@/containers';
import PortSaleLayout from '@/layouts/PortSaleLayout';
import { ReactNode } from 'react';

export default function SpendingMoneyPage() {
  return <SpendingMoney />;
}

SpendingMoneyPage.getLayout = (page: ReactNode) => (
  <PortSaleLayout>{page}</PortSaleLayout>
);
