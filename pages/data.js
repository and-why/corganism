import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Layout from '@/components/Layout';

export default function Data() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== 'undefined' && loading) return null;
  if (!session) {
    return <p>You are not signed in and cannot access this page</p>;
  }

  return (
    <Layout>
      <h1>Welcome to data</h1>
      <p>{content}</p>
    </Layout>
  );
}
