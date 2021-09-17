import { Container } from '@/components/styled-components/Container';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <Layout page='home'>
      <Container>
        <p>Hompage</p>
      </Container>
    </Layout>
  );
}
