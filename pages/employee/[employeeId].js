import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GET_EMPLOYEE_BY_ID } from '@/components/graphql/queries';
import ProfileIcon from '@/components/icons/profile';
import Layout from '@/components/Layout';
import ProfileTab from '@/components/ProfileTab';
import { ErrorMessage } from '@/components/styled-components/ErrorMessage';
import { Flex } from '@/components/styled-components/Flex';
import { LeftColumn, RightColumn, TwoColumns } from '@/components/styled-components/PageLayouts';
import Breadcrumbs from '@/components/Breadcrumbs';

export const ProfilePageStyles = styled.div`
  display: flex;
  color: var(--white);
  flex-direction: column;
  /* mix-blend-mode: difference; */
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  h2 {
    margin: 0.5em 0;
  }
  svg {
    height: 130px;
    width: 130px;
    margin-right: 50px;
  }
`;

export const ProfileInfoTable = styled.table`
  display: table;
  margin-bottom: 15px;
`;
export const ProfileInfoLine = styled.tr`
  width: 100%;
  a.clickcopy {
    display: flex;
    position: relative;
    text-decoration: none;
    cursor: pointer;
    &[aria-current='true'] {
      background: var(--primary);
      color: var(--black);
    }
    &:hover {
      svg g {
        stroke: #fff;
      }
    }
    &.clickcopy:hover:after {
      content: '';
      position: absolute;
      border: 10px solid var(--black);
      border-color: transparent transparent black transparent;
      right: 90%;
      top: 17px;
      transform: translateX(50%);
    }
    &.clickcopy:hover:before {
      content: attr(data-text);
      position: absolute;
      top: 35px;
      right: 90%;
      transform: translateX(50%);
      background: var(--black);
      color: white;
      padding: 1em;
      border-radius: 10px;
      width: 80%;
      text-align: center;
      z-index: 99;
    }
  }
  td {
    padding: 0.75em 0;
    &:nth-child(2) {
      font-weight: 700;
    }
  }
`;

export default function EmployeePage() {
  const { query } = useRouter();
  const { employeeId } = query;
  function clickToCopy(e) {
    navigator.clipboard.writeText(e.target.innerText);
    e.target.setAttribute('data-text', 'Copied!');
  }

  const { data, loading, error } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
  });
  if (loading) return <p>loading...</p>;

  const user = data?.getEmployeeById;

  return (
    <Layout>
      {error && <ErrorMessage error={error.message} />}
      <TwoColumns>
        <LeftColumn>
          <Breadcrumbs employeeId={user.id} />
          {user.manager && (
            <>
              <h3>Manager:</h3>
              <ProfileTab employeeId={user.manager.id} type='manager' />
            </>
          )}
          <ProfileTab employeeId={user.id} />
          {user.reports.length > 0 && (
            <>
              <h3>Direct reports:</h3>
              {user.reports.map((report) => (
                <ProfileTab employeeId={report.id} type='report' />
              ))}
            </>
          )}
        </LeftColumn>
        <RightColumn background='var(--dark)'>
          <ProfilePageStyles>
            <Flex justify='flex-start' mb='50px'>
              {user?.image ? <Image src={user.image} /> : <ProfileIcon />}
              <h2>{user.name}</h2>
            </Flex>
            <ProfileInfoTable>
              {user.manager && (
                <ProfileInfoLine>
                  <td>Manger:</td>{' '}
                  <td>
                    <Link href={user.manager.id}>
                      <a>{user.manager.name}</a>
                    </Link>
                  </td>
                </ProfileInfoLine>
              )}
              <ProfileInfoLine>
                <td>Position:</td> <td>{user.position || 'Unknown'}</td>{' '}
              </ProfileInfoLine>
              <ProfileInfoLine>
                <td>Department:</td> <td>{user.department || 'Unknown'}</td>{' '}
              </ProfileInfoLine>
              <ProfileInfoLine>
                <td>Email:</td>{' '}
                <td>
                  {(
                    <a className='clickcopy' onClick={clickToCopy} data-text='Click to copy'>
                      {user.email}
                    </a>
                  ) || 'Unknown'}
                </td>
              </ProfileInfoLine>
              <ProfileInfoLine>
                <td>Phone Number:</td> <td>{user.number || 'Unknown'}</td>{' '}
              </ProfileInfoLine>
            </ProfileInfoTable>
            {(user.twitter || user.linkedin) && (
              <>
                <h3>Socials</h3>
                <ProfileInfoTable>
                  <ProfileInfoLine>
                    <td>Twitter:</td>
                    <td>{user.twitter || 'Unknown'}</td>
                  </ProfileInfoLine>
                  <ProfileInfoLine>
                    <td>LinkedIn:</td>
                    <td>{user.linkedin || 'Unknown'}</td>
                  </ProfileInfoLine>
                </ProfileInfoTable>
              </>
            )}
          </ProfilePageStyles>
        </RightColumn>
      </TwoColumns>
    </Layout>
  );
}
