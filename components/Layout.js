import Navigation, { Container } from './Navigation';

export default function Layout({ children, page }) {
  return (
    <>
      <Navigation page={page} />
      {children}
    </>
  );
}
