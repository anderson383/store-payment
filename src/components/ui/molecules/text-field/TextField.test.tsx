import * as Yup from 'yup';

import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { act } from 'react';
import { TextField } from './TextField';
import { Formik } from 'formik';
import { fieldRequired } from '../../../../constants/messages-validator';

const onChangeInputMock = jest.fn()

const validationSchemaText =  Yup.object({
  test: Yup.string().required(fieldRequired)
})


describe('Tests in TextField component', () => {

  const setup = (ui: React.ReactElement, { initialValues, ...renderOptions }: any) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={() => {}} validationSchema={validationSchemaText} >
        {ui}
      </Formik>,
      renderOptions
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup(<TextField name="test" />, { initialValues: { test: '' } });
    
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should onBlur and render error', async () => {
    const {asFragment} = setup(<TextField type='text' label='test' name="test" />, { initialValues: { test: '' } });
    const input = screen.getByLabelText(/test/i);
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: null } });
    await act(() => Promise.resolve())
    expect(screen.getByText(fieldRequired)).toBeDefined();
  });

  test('Should listening changes', async () => {
    const {asFragment} = setup(<TextField props={{ onChange: onChangeInputMock }} label='test' name="test" />, { initialValues: { test: '' } });
    const input = screen.getByLabelText(/test/i);
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: 'test' } });
    await act(() => Promise.resolve())
    expect(onChangeInputMock).toHaveBeenCalled();
  });
});
