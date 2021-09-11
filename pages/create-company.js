import CreateCompanyForm from '@/components/forms/CreateCompanyForm';
import Layout from '@/components/Layout';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const GET_ALL_COMPANIES = gql`
  query GET_ALL_COMPANIES {
    getAllCompanies {
      path
      users {
        id
      }
    }
  }
`;

export default function CreateCompanyPage() {
  const router = useRouter();
  const [session, loading] = useSession();
  const { data, loadingCompanies, error } = useQuery(GET_ALL_COMPANIES);

  if (!data) {
    return (
      <Layout>
        <h1>Create your company</h1>
        <p>Loading</p>
      </Layout>
    );
  }
  data.getAllCompanies.map((company) => {
    console.log(company.users);
    company.users.map((user) => {
      if (user.id === session?.user.id) {
        return router.push({
          pathname: `/${company.path}`,
        });
      }
    });
  });

  return (
    <Layout>
      <h1>Create your company</h1>
      <CreateCompanyForm />
    </Layout>
  );
}
