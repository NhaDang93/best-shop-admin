import { Login } from '@/containers';
import { UnAuthLayout } from '@/layouts/UnAuthLayout';
import { ReactNode } from 'react';

export default function LoginPage() {
  return <Login />;
}

LoginPage.getLayout = (page: ReactNode) => <UnAuthLayout>{page}</UnAuthLayout>;
