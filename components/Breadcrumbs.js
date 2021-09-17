import styled from 'styled-components';
import Link from 'next/link';
import { Flex } from './styled-components/Flex';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEE_BY_ID } from './graphql/queries';

export const BreadcrumbsStyles = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  background: var(--lightgray);
  width: 100%;
  overflow-x: auto;
  div {
    flex-shrink: 0;
    font-weight: 700;
  }
  a {
    flex-shrink: 0;
    margin-right: 0.5em;
    &:after {
      content: '>';
      margin: 0 0.5em;
    }
  }
`;

export const ManagerLink = ({ employeeId }) => {
  const { data, loading, error } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
  });
  if (loading) return <p>Loading</p>;
  const user = data?.getEmployeeById;

  return (
    <>
      {user?.manager && <ManagerLink employeeId={user.manager.id} />}
      <Link href={employeeId} className='manager'>
        {user?.name}
      </Link>
    </>
  );
};

export default function Breadcrumbs({ employeeId }) {
  const { data, loading, error } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
  });

  if (loading) return <p>Loading</p>;

  const user = data?.getEmployeeById;

  return (
    <BreadcrumbsStyles>
      {user.manager && <ManagerLink employeeId={user.manager.id} />}
      <div>{user.name}</div>
    </BreadcrumbsStyles>
  );
}
