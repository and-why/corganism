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

  const employees = data?.getAllEmployees;
  console.log(employees);

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    email: '',
    position: '',
    managerId: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        name: inputs.name,
        email: inputs.email,
        companyId: companyId,
      };
      const res = await fetch('/api/email/send-mail', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(res);
      if (res.status === 200) {
        console.log('Response succeeded!');

        await addEmployee({
          variables: {
            name: inputs.name,
            email: inputs.email,
            position: inputs.position,
            companyId: companyId,
            managerId: inputs.managerId,
          },
        });

        setShowToaster(true);
        clearForm();
      } else {
        return res.error;
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
            <h2>Add {employees?.length > 0 ? `an` : `your first`} employee</h2>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {addError && <ErrorMessage>{addError.message}</ErrorMessage>}
            <p>
              {employees?.length > 0
                ? `Please enter the details of your next employee. Adding the manager before their direct report is the simplest way to do this.`
                : `The simplest way to add employees, is to add your highest employee, then their direct reports. From there you can add the direct reports of those direct reports. Always add a manager before their direct report.`}
            </p>
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
          <p>Make sure you&apos;re happy before submitting</p>
          <Button dark type='submit' disabled={isLoading}>
            Submit
          </Button>
        </footer>
      </Form>
      <Toaster
        heading='Success'
        content={`Employee was added successfully. They will recieve an email invite to join.`}
        display={showToaster}
        setShowToaster={setShowToaster}
      />
    </>
  );
}
