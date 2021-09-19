import useForm from '@/utils/useForm';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { Button } from '../styled-components/Button';
import { Form } from '../styled-components/Forms';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { UniqueInputFieldNamesRule } from 'graphql';
import { useEffect } from 'react';
import { ErrorMessage } from '../styled-components/ErrorMessage';
import { GET_ALL_USERS } from '../graphql/queries';

export const CREATE_COMPANY_MUTATION = gql`
  mutation CREATE_COMPANY_MUTATION($name: String!, $userId: String!, $path: String!) {
    createCompany(name: $name, userId: $userId, path: $path) {
      id
      name
      path
    }
  }
`;

export default function CreateCompanyForm() {
  const router = useRouter();
  const [session, _loading] = useSession();
  const userId = session?.user.id;
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    userId,
    name: '',
    path: '',
  });
  const [createCompany, { data, loading, error }] = useMutation(CREATE_COMPANY_MUTATION, {
    refetchQueries: [GET_ALL_USERS, 'getAllUsers'],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createCompany({
        variables: {
          userId: userId,
          name: inputs.name,
          path: inputs.path,
        },
      });
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <h2>Add your company information</h2>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <p>Please enter the details of your company.</p>
          </label>
          <input
            name='name'
            value={inputs?.name}
            placeholder='Company name'
            onChange={handleChange}
          />
          <input
            name='path'
            value={inputs?.path}
            placeholder='Company Website'
            onChange={handleChange}
          />
        </fieldset>
        <footer>
          <p>Make sure you're happy before submitting</p>
          <Button dark type='submit' disabled={loading}>
            Submit
          </Button>
        </footer>
      </Form>
    </>
  );
}
