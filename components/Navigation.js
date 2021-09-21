import { useSession, signIn, signOut } from 'next-auth/client';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { Button } from './styled-components/Button';
import Logo from './Logo';
import { Container } from './styled-components/Container';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from './graphql/queries';
import { useRouter } from 'next/router';

export const Header = styled.header`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  border-bottom: 1px solid var(--gray);
  .logo svg {
    height: 60px;
    width: 60px;
  }
`;
export const Grid = styled.header`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 3fr;
  } ;
`;
export const LogoStyles = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 2em;
    margin: 0;
    margin-left: 10px;
  }
`;

export const Menu = styled.ul`
  justify-self: end;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0%;
  li {
    list-style: none;
    margin: 0;
    margin-left: 1em;
  }
`;

export default function Navigation({ page }) {
  const [session, loading] = useSession();
  const router = useRouter();
  const {
    data,
    error,
    loading: loadingUsers,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: session?.user.id,
    },
  });

  // console.log(data, session);

  if (loading || loadingUsers) {
    return <p>loading</p>;
  }

  // if (!data?.getUser.employee && router.pathname !== '/auth/new-user') {
  //   router.push({
  //     pathname: '/auth/new-user',
  //   });
  // }

  return (
    <Header>
      <Container padding='1em 5em'>
        <Grid>
          <div className='logo'>
            <Link href={session?.user ? '/dashboard' : '//auth/new-user'}>
              <a>
                <LogoStyles>
                  <Logo />
                  <h2>Eadee</h2>
                </LogoStyles>
              </a>
            </Link>
          </div>
          <Menu>
            {session ? (
              <>
                <li>
                  <Link href='/dashboard'>
                    <Button secondary>Dashboard</Button>
                  </Link>
                </li>
                {data?.getUser?.employee && (
                  <li>
                    <Link href={`/employee/${data.getUser.employee.id}`}>
                      <Button secondary>Profile</Button>
                    </Link>
                  </li>
                )}
                <li>
                  <Link href='/company'>
                    <Button>Edit Company</Button>
                  </Link>
                </li>
                <li>
                  <Link href='/account'>
                    <Button>Account</Button>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link href='/signin'>
                  <Button>Sign In / Up</Button>
                </Link>
              </li>
            )}
          </Menu>
        </Grid>
      </Container>
    </Header>
  );
}
