import useForm from '@/utils/useForm';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { Button } from '../styled-components/Button';
import { Form } from '../styled-components/Forms';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { UniqueInputFieldNamesRule } from 'graphql';

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
    name: '',
  });
  const [createCompany, { data, loading, error }] = useMutation(CREATE_COMPANY_MUTATION);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createCompany({
      variables: {
        userId: userId,
        name: inputs.name,
        path: inputs.name.replace(/\s+/g, '-').toLowerCase(),
      },
    });
    console.log(res.data.createCompany.name);

    // router.push({
    //   pathname: `/${res.}`
    // })
  };

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <label>
          <h2>Company name</h2>
          <p>This name will be permanent and will also act as your URL</p>
        </label>
        <input
          name='name'
          value={inputs?.name}
          placeholder='Company name'
          onChange={handleChange}
        />
      </fieldset>
      <footer>
        <p>Make sure you're happy before submitting</p>
        <Button dark type='submit'>
          Submit
        </Button>
      </footer>
    </Form>
  );
}
