import { ExchangeCash } from '@/containers';
import PortSaleLayout from '@/layouts/PortSaleLayout';
import { ReactNode } from 'react';

export default function ExchangeCashPage() {
  return <ExchangeCash />;
}

ExchangeCashPage.getLayout = (page: ReactNode) => (
  <PortSaleLayout>{page}</PortSaleLayout>
);
