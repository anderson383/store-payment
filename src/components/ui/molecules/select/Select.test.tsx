import * as Yup from 'yup';

import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { act } from 'react';
import { Select } from './Select';
import { Formik } from 'formik';
import { fieldRequired } from '../../../../constants/messages-validator';
import { OptionType } from 'types/common';
import { unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';

const onChangeMock = jest.fn()

jest.mock('')

const validationSchemaText =  Yup.object({
  test: Yup.string().required(fieldRequired)
})

const fieldsOptions: OptionType[]  = [{ label: 'Field 1', value: '1' }, { label: 'Field 2', value: '2' }, { label: 'Field 3', value: '3' } ]


describe('Tests in Select component', () => {
  let container:any = null;
  let root:any = null;

  afterEach(() => {
    act(() => {
      root.unmount();
    })
    container?.remove();
    container = null;
  });

  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('id', 'portal-root');
    container.setAttribute('role', 'portal-root');
    root = createRoot(container!);

    document.body.appendChild(container);
  });

  const setup = (ui: React.ReactElement, { initialValues, ...renderOptions }: any) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={() => {}} validationSchema={validationSchemaText} >
        {ui}
      </Formik>,
      renderOptions
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup(<Select label='Test' name="test" options={fieldsOptions}/>, { initialValues: { test: null } });
    
    expect(asFragment()).toMatchSnapshot();
  });

  test('selects an option when clicked', async  () => {
    setup(<Select name="select" options={fieldsOptions} onChange={onChangeMock} />, { initialValues: { select: null } });
    const selectInput = screen.getByRole('textfield');
    fireEvent.blur(selectInput); // Click
    await act(() => Promise.resolve())
    fireEvent.click(selectInput); // Abre el menú
    const option = screen.getByText(/Field 1/i);
    fireEvent.click(option); // Selecciona la opción
    expect(onChangeMock).toHaveBeenCalled();
    // expect(selectInput).toHaveValue('Field 1'); // Verifica que el valor sea el correcto
  });

  test('Should open menu and close with click outside', async  () => {
    const { debug, getByRole } = setup(<Select name="select" options={fieldsOptions} onChange={onChangeMock} />, { initialValues: { select: null } });
    const selectInput = screen.getByRole('textfield');
    fireEvent.blur(selectInput); // Click
    await act(() => Promise.resolve())
    fireEvent.click(selectInput); // Abre el menú
    fireEvent.mouseDown(getByRole('portal-root'))
    await act(() => Promise.resolve())
    expect(screen.queryByText(/Field 1/i)).toBeNull();
  });
});
