import { GET_COMPANY_BY_ID } from '@/components/graphql/queries';
import Layout from '@/components/Layout';
import { Button } from '@/components/styled-components/Button';
import { Container } from '@/components/styled-components/Container';
import { ErrorMessage } from '@/components/styled-components/ErrorMessage';
import { Form } from '@/components/styled-components/Forms';
import useForm from '@/utils/useForm';
import { useQuery } from '@apollo/client';
import { getCsrfToken, signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignUpCompany({ email, companyId }) {
  const [session] = useSession();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { data, loading } = useQuery(GET_COMPANY_BY_ID, { variables: { id: companyId } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn('email', { email: email });

      console.log(res);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      return;
    }
  };

  if (loading) return null;

  const company = data?.getCompanyById;
  console.log(company);

  return (
    <Layout>
      <Container>
        <Form onSubmit={handleSubmit}>
          {/* <input name='csrfToken' type='hidden' defaultValue={csrfToken} /> */}
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <fieldset>
            <h2>Sign up</h2>
            <label>
              <p>
                You have been invited to join <strong>{company ? `${company?.name}'s` : ''}</strong>{' '}
                Eadee account. Complete the process by signing up below. Your email has
                automatically been applied.
              </p>
            </label>
            <input disabled type='email' id='email' name='email' value={email} />
          </fieldset>
          <footer>
            <p>Once you sign up please check your emails for verification.</p>
            <Button dark type='submit' disabled={isLoading}>
              Sign up
            </Button>
          </footer>
        </Form>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  // const csrfToken = await getCsrfToken(context);
  return {
    props: {
      email: query.email,
      companyId: query.companyId,
      // csrfToken
    },
  };
}
