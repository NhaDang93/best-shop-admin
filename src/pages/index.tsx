import { Home } from '@/containers';
import UnAuthLayout from '@/layouts/UnAuthLayout';
import { ReactNode } from 'react';

export default function HomePage() {
  return <Home />;
}

HomePage.getLayout = (page: ReactNode) => <UnAuthLayout>{page}</UnAuthLayout>;
