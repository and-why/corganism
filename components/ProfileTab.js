import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import styled, { css } from 'styled-components';
import { GET_ALL_USERS, GET_EMPLOYEE_BY_ID } from './graphql/queries';
import { ErrorMessage } from './styled-components/ErrorMessage';
import ProfileIcon from './icons/profile';

export const ProfileTabStyles = styled.div`
  margin: 0.5em;
  width: 300px;
  border-radius: var(--brl);
  position: relative;
  :hover {
    background: var(--lightgray);
  }
  ${(props) =>
    props.type === 'report' &&
    css`
      margin-left: 45px;
      width: 260px;
    `}
  ${(props) =>
    props.type === 'manager' &&
    css`
      width: 260px;
    `}
  a {
    padding: 1em;
    display: flex;
    align-items: center;
    h4 {
      margin-bottom: 0;
      font-size: 1.1em;
    }
    svg {
      height: 100px;
      width: 100px;
      margin-right: 25px;
      flex-shrink: 1;
    }
    div {
      flex-shrink: 999999;
    }
    ${(props) =>
      (props.type === 'manager' || props.type === 'report') &&
      css`
        svg {
          height: 60px;
          width: 60px;
        }
      `}
  }
`;
export const SkeletonProfileStyles = styled.div`
  display: flex;

  div.image {
    height: 100px;
    width: 100px;
    background: var(--lightgray);
    margin-right: 25px;
  }
`;

export function SkeletonProfile() {
  return (
    <ProfileTabStyles>
      <ProfileIcon />
      <div>
        <h4>Name</h4>
        <p>Position</p>
      </div>
    </ProfileTabStyles>
  );
}

export default function ProfileTab({ employeeId, type }) {
  console.log('employeeid', employeeId);
  const { data, loading, error } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
  });
  console.log('profile data', data);
  console.log(error);

  if (loading || !data) {
    return <SkeletonProfile />;
  }

  const user = data?.getEmployeeById;
  return (
    <>
      <ProfileTabStyles type={type}>
        <Link href={`/employee/${user.id}`}>
          <a>
            {error && <ErrorMessage error={error.message} />}
            {user.image ? <Image href={user.image} /> : <ProfileIcon />}
            <div>
              <h4>{user.name}</h4>
              <p>{user.position}</p>
            </div>
          </a>
        </Link>
      </ProfileTabStyles>
    </>
  );
}
