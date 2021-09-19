import { useSession, signIn, signOut } from 'next-auth/client';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { Button } from './styled-components/Button';
import Logo from './Logo';
import { Container } from './styled-components/Container';

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
  return (
    <Header>
      <Container padding='1em 5em'>
        <Grid>
          <div className='logo'>
            <Link href={session?.user ? '/dashboard' : '/'}>
              <a>
                <Logo />
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
                <li>
                  <Button secondary>Profile</Button>
                </li>
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
