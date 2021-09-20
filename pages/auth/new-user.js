import { LINK_USER, UPDATE_EMPLOYEE } from '@/components/graphql/mutations';
import { GET_ALL_USERS, GET_EMPLOYEE_BY_ID, GET_USER_BY_ID } from '@/components/graphql/queries';
import Layout from '@/components/Layout';
import { Button } from '@/components/styled-components/Button';
import { Container } from '@/components/styled-components/Container';
import { Form } from '@/components/styled-components/Forms';
import useForm from '@/utils/useForm';
import { gql, useMutation, useQuery } from '@apollo/client';
import client from 'config/apollo-client';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function NewUserPage({ session, companies }) {
  console.log(session);
  console.log(companies);
  const router = useRouter();

  // Get user email from session
  const userEmail = session.user.email;

  // See if user email is within a company and return that company
  const [company] = companies.filter((company) =>
    company.employees.some((employee) => employee.email === userEmail),
  );
  // find employee id that matches the email
  const [employee] = company.employees.filter((employee) => employee.email === userEmail);

  // get Employee data so we can check if the data is updated to more onto next phase
  const {
    data: dataEmployee,
    loading: loadingEmployee,
    error: errorEmployee,
  } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: {
      id: employee.id,
    },
  });
  const [updateEmployee, { data: dataE, loading: loadingE, error: errorE }] =
    useMutation(UPDATE_EMPLOYEE);
  const [linkUser, { data, loading, error }] = useMutation(LINK_USER);

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    phone: '',
    twitter: '',
    linkedin: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // update employees details
      await updateEmployee({
        variables: {
          id: employee.id,
          phone: inputs.phone,
          twitter: inputs.twitter,
          linkedin: inputs.linkedin,
        },
      });
      // link user to their employee profile and company
      await linkUser({
        variables: {
          userId: session?.user.id,
          employeeId: employee.id,
          companyId: company.id,
        },
        refetchQueries: [GET_USER_BY_ID, GET_EMPLOYEE_BY_ID, GET_ALL_USERS],
      });
    } catch (error) {
      throw error;
    }
  };

  //  If there is no company attached to the email, display error
  if (!company.name) {
    <Layout>
      <Container>
        <p>
          Unfortuantely, there are no users at any company with that email address. Please contact
          your administator to add you as an employee.
        </p>
      </Container>
    </Layout>;
  }
  // if the employee has a user attached to it, reroute to the employee's page
  if (dataEmployee?.getEmployeeById.user) {
    router.push({
      pathname: `/employee/${employee.id}`,
    });
  }
  return (
    <Layout>
      <Container>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <h2>Welcome to {company.name}'s Eadee Account</h2>
              <p>
                Please fill in the below to complete your signup. These fields are all optional but
                will ensure the Employee Database is more complete and usable.
              </p>
            </label>
            {}
            <input
              required
              name='phone'
              id='phone'
              onChange={handleChange}
              value={inputs?.phone}
              placeholder='Phone Number'
            />
            <input
              name='twitter'
              id='twitter'
              onChange={handleChange}
              value={inputs?.twitter}
              placeholder='Twitter @...'
            />
            <input
              name='linkedin'
              id='linkedin'
              onChange={handleChange}
              value={inputs?.linkedin}
              placeholder='Linkedin: https://www.linkedin.com.au/'
            />
          </fieldset>
          <footer>
            <p>The more information you provide, the better the experience.</p>
            <Button dark type='submit'>
              Confirm
            </Button>
          </footer>
        </Form>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const { data } = await client.query({
    query: gql`
      query GET_ALL_COMPANIES {
        getAllCompanies {
          id
          name
          users {
            email
          }
          employees {
            id
            email
          }
        }
      }
    `,
  });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      companies: data.getAllCompanies,
      session,
    },
  };
}
