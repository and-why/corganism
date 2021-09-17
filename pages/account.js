import Layout from '@/components/Layout';

import { Button } from '@/components/styled-components/Button';
import { Container } from '@/components/styled-components/Container';
import { useSession, signIn, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AccountPage() {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session) {
      router.push({
        pathname: '/',
      });
    }
  }, [session]);

  return (
    <Layout>
      <Container>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Container>
    </Layout>
  );
}
