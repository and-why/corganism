import { GET_ALL_EMPLOYEES, GET_ALL_USERS } from '@/components/graphql/queries';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import client from 'config/apollo-client';
import { getSession, useSession } from 'next-auth/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { ErrorMessage } from '@/components/styled-components/ErrorMessage';
import ProfileTab from '@/components/ProfileTab';
import { Flex } from '@/components/styled-components/Flex';
import { Container } from '@/components/styled-components/Container';

export default function Home({ users, session }) {
  console.log(session);

  const [user] = users.filter((user) => user.id == session?.user.id);

  const companyId = user?.company.id;
  const { data, loading, error } = useQuery(GET_ALL_EMPLOYEES, {
    variables: { id: companyId },
  });
  const employees = data?.getAllEmployees;
  console.log('employees', employees);

  // if (typeof window !== 'undefined') return null;
  const noManagers = employees?.filter((employee) => employee.manager === null);

  return (
    <Layout>
      <Container>
        {loading && <p>loading</p>}
        {error && <ErrorMessage error={error.message} />}
        <h2>Leadership</h2>
        <Flex align='flex-start' justify='flex-start'>
          {noManagers &&
            noManagers.map((noManager) => (
              <Flex
                align='center'
                justify='flex-start'
                margin='25px'
                direction='column'
                border='1px solid var(--gray)'
                borderRadius='10px'
              >
                <ProfileTab employeeId={noManager.id} />
                <Flex justify='flex-start'>
                  {noManager.reports &&
                    noManager.reports.map((report) => (
                      <ProfileTab employeeId={report.id} type='report' />
                    ))}
                </Flex>
              </Flex>
            ))}
        </Flex>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { data } = await client.query({
    query: gql`
      query GET_ALL_USERS {
        getAllUsers {
          id
          name
          email
          company {
            id
            name
          }
        }
      }
    `,
  });
  return {
    props: {
      users: data.getAllUsers,
      session,
    },
  };
}
