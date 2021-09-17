import useForm from '@/utils/useForm';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from '../styled-components/Button';
import { Form } from '../styled-components/Forms';
import gql from 'graphql-tag';
import { ErrorMessage } from '../styled-components/ErrorMessage';
import { useState } from 'react';
import Toaster from '../styled-components/Toaster';
import { GET_ALL_EMPLOYEES } from '../graphql/queries';
import { ADD_EMPLOYEE } from '../graphql/mutations';

export default function AddEmployeesForm({ user }) {
  const [isLoading, setLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const companyId = user.company.id;
  const { data, loading, error } = useQuery(GET_ALL_EMPLOYEES, {
    variables: { id: companyId },
  });
  const [addEmployee, { data: addEmployeeData, loading: addDataLoading, error: addError }] =
    useMutation(ADD_EMPLOYEE, {
      refetchQueries: [GET_ALL_EMPLOYEES],
    });
  console.log('form user', user);

  const employees = data?.getAllEmployees;
  console.log(employees);

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Andy Smith',
    email: 'andy@andysmith.is',
    position: 'CEO',
    managerId: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('inputs', inputs);
      const res = await addEmployee({
        variables: {
          name: inputs.name,
          email: inputs.email,
          position: inputs.position,
          companyId: companyId,
          managerId: inputs.managerId,
        },
      });

      console.log('res', res);
      if (res) {
        setShowToaster(true);
        clearForm();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  // if (error) return <p>{error.message}</p>;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <h2>Add an employee</h2>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {addError && <ErrorMessage>{addError.message}</ErrorMessage>}
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
          <select name='managerId' id='managerId' onChange={handleChange} value={inputs?.managerId}>
            <option value={undefined}>No Manager</option>
            {(loading || addDataLoading) && <option>loading</option>}
            {employees?.map((employee) => {
              return (
                <option key={employee.id} value={employee.id}>
                  {employee.name} ({employee.position})
                </option>
              );
            })}
          </select>
        </fieldset>
        <footer>
          <p>Make sure you're happy before submitting</p>
          <Button dark type='submit' disabled={isLoading}>
            Submit
          </Button>
        </footer>
      </Form>
      <Toaster
        heading='Success'
        content={`Employee was added successfully`}
        display={showToaster}
        setShowToaster={setShowToaster}
      />
    </>
  );
}
