import Navigation, { Container } from './Navigation';

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Container>{children}</Container>
    </>
  );
}
