import { useSession, signIn, signOut } from 'next-auth/client';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

import { Button } from '@/styled-components/Button';
import { Container } from '@/components/styled-components/Container';

export default function SignInPage() {
  const [session, loading] = useSession();

  if (session) {
    return (
      <Layout>
        Signed in as {session.user.email} <br />
        <Button secondary onClick={() => signOut()}>
          Sign out
        </Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Button disabled={loading} onClick={() => signIn('github')}>
          Sign in with GitHub
        </Button>
        <Button disabled={loading} onClick={() => signIn('twitter')}>
          Sign in with Twitter
        </Button>
      </Container>
    </Layout>
  );
}
