import { GET_ALL_EMPLOYEES } from '@/components/graphql/queries';
import { useQuery } from '@apollo/client';
import client from 'config/apollo-client';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  const session = await getSession({ req });
  const companyId = await session.company.id;
  const { data, loading, error } = useQuery(GET_ALL_EMPLOYEES, {
    variables: { id: companyId },
  });

  console.log('data', data);
  const dataFormat = JSON.parse(JSON.stringify(data));
  if (session) {
    res.status(200).send({ content: dataFormat });
  } else {
    res.status(400).send({
      error: 'You need to sign in to see this content',
    });
  }
};
