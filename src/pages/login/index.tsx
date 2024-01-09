import { Login } from '@/containers';
import { ReactNode } from 'react';

export default function LoginPage() {
  return <Login />;
}

LoginPage.getLayout = (page: ReactNode) => <div>{page}</div>;
