import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [session, loading] = useSession();
  const companyName = session?.user.company;
  return <Layout>{!companyName && <Link href='/create-company'>Create Company</Link>}</Layout>;
}
