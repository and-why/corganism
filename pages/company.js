import Link from 'next/link';
import CreateCompanyForm from '@/components/forms/CreateCompanyForm';
import Layout from '@/components/Layout';
import { useMutation, useQuery } from '@apollo/client';
import client from 'config/apollo-client';
import gql from 'graphql-tag';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import AddEmployeesForm from '@/components/forms/AddEmployeesForm';
import { GET_ALL_USERS } from '@/components/graphql/queries';
import { Container } from '@/components/styled-components/Container';

export default function CreateCompanyPage() {
  const [session, loadingSession] = useSession();
  // console.log(data);
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No Data</p>;
  }
  const [user] = data.getAllUsers.filter((user) => user.id == session?.user.id);

  // console.log('user', user);
  return (
    <Layout>
      <Container>
        <h1>My company</h1>
        {!user?.company ? <CreateCompanyForm /> : <AddEmployeesForm user={user} />}
      </Container>
    </Layout>
  );
}
