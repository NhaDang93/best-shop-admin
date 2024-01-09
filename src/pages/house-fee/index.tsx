import { HouseFee } from '@/containers';
import PortSaleLayout from '@/layouts/PortSaleLayout';
import { ReactNode } from 'react';

export default function HouseFeePage() {
  return <HouseFee />;
}

HouseFeePage.getLayout = (page: ReactNode) => (
  <PortSaleLayout>{page}</PortSaleLayout>
);
