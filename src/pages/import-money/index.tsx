import { ImportMoney } from '@/containers';
import PortSaleLayout from '@/layouts/PortSaleLayout';
import { ReactNode } from 'react';

export default function ImportMoneyPage() {
  return <ImportMoney />;
}

ImportMoneyPage.getLayout = (page: ReactNode) => (
  <PortSaleLayout>{page}</PortSaleLayout>
);
