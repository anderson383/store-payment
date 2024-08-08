
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';
import { ModalSuccess } from './ModalSucces';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { setModalSuccessSlice } from '../../../redux/payment/slices/payment-slice';

const mockStore:any = configureStore([]);

describe('Tests in ModalSuccess component', () => {

  let store:any;

  
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
    container.setAttribute('id', 'radix-:r0:');
    container.setAttribute('role', 'dialog');
    root = createRoot(container!);

    document.body.appendChild(container);
  });

  
  beforeEach(() => {
    store = mockStore({
      paymentReducer: {
        payment: {
          modalSuccess: true, // Estado inicial del modal
        },
      },
    });
  });

  const setup = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ModalSuccess />
        </BrowserRouter>
      </Provider>
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup();
    
    await act(() => Promise.resolve())

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/Payment Succesful/i)).toBeDefined();
    expect(screen.getByText(/You will receive your order in the coming days/i)).toBeDefined();
  });

  test('Should dispatches action to close modal when Ok button is clicked', () => {
    setup();

    // Simula clic en el botón 'Ok'
    fireEvent.click(screen.getByRole('button', { name: /Ok/i }));

    // Verifica que se despache la acción para cerrar el modal
    const actions = store.getActions();
    expect(actions).toEqual([setModalSuccessSlice(false)]);
  });
});
