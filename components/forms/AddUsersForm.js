import useForm from '@/utils/useForm';
import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { getCsrfToken, signIn } from 'next-auth/client';
import { Button } from '../styled-components/Button';
import { Form } from '../styled-components/Forms';
import gql from 'graphql-tag';
import { ErrorMessage } from '../styled-components/ErrorMessage';
import { GET_ALL_USERS } from 'pages/company';

export const CREATE_NEW_USER = gql`
  mutation CREATE_NEW_USER(
    $name: String!
    $email: String!
    $companyId: String!
    $position: String!
  ) {
    addUser(name: $name, email: $email, companyId: $companyId, position: $position) {
      id
    }
  }
`;
// export const GET_ALL_EMPLOYEES = gql`
//   query GET_ALL_EMPLOYEES($companyId: companyId) {
//     getAllEmployees(where: { company: companyId }) {
//       id
//       name
//       position
//     }
//   }
// `;
export default function AddUsersForm({ user }) {
  const [session, _loading] = useSession();
  console.log('form user', user);
  const companyId = user.company.id;
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Ranie Daw',
    email: 'work@andysmith.is',
    position: 'Head of head',
  });
  const [addUser, { data, loading, error }] = useMutation(CREATE_NEW_USER, {
    refetchQueries: [GET_ALL_USERS, 'getAllUsers'],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addUser({
        variables: {
          name: inputs.name,
          email: inputs.email,
          companyId: companyId,
          position: inputs.position,
        },
      });

      console.log(res);
    } catch (error) {
      return error;
    }
  };
  // if (error) return <p>{error.message}</p>;
  if (loading) return <p>loading</p>;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <h2>Add an employee</h2>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <p>Please enter the details of your employee.</p>
          </label>
          <input name='name' value={inputs?.name} placeholder='Full Name' onChange={handleChange} />
          <input
            name='email'
            value={inputs?.email}
            placeholder='Email Address'
            onChange={handleChange}
          />
          <input
            name='position'
            value={inputs?.position}
            placeholder='Position'
            onChange={handleChange}
          />
          <select name='manager' id='manager'></select>
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
