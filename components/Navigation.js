import { useSession, signIn, signOut } from 'next-auth/client';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { Button } from './styled-components/Button';
import Logo from './Logo';

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 1em 5em;
`;

export const Header = styled.header`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  border-bottom: 1px solid var(--gray);
  margin-bottom: 50px;
  .logo svg {
    height: 60px;
    width: 60px;
  }
`;
export const Grid = styled.header`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const Menu = styled.ul`
  justify-self: end;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  li {
    list-style: none;
    margin: 0;
    margin-left: 1em;
  }
`;

export default function Navigation({}) {
  const [session, loading] = useSession();
  return (
    <Header>
      <Container>
        <Grid>
          <div className='logo'>
            <Logo />
          </div>

          <Menu>
            <li>
              <Link href='/'>
                <Button secondary>Home</Button>
              </Link>
            </li>
            <li>
              <Button secondary>Direct Reports</Button>
            </li>
            {session?.user.email ? (
              <>
                <li>
                  <Link href='/account'>
                    <Button>Account</Button>
                  </Link>
                </li>
                <li>
                  <Button onClick={() => signOut()}>Sign out</Button>
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
