
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';
import { ModalPayment } from './ModalPayment';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { setModalSuccessSlice, setTemporalCardCreditSlice, setTemporalCustomerInfoSlice } from '../../../redux/payment/slices/payment-slice';
import { RepositoryIocProvider } from '../../../services/services/config/context';

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
          modalPayment: true,
          customerInfo: {},
          creditCard: {},
          productInfo: { name: 'Test Product', quantity: 1, price: 100, images: ['test.jpg'] },
        },
      },
    });

    // Mocks para las acciones de Redux
    store.dispatch = jest.fn();
  });

  const setup = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <RepositoryIocProvider>
            <ModalPayment />
          </RepositoryIocProvider>
        </BrowserRouter>
      </Provider>
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup();
    
    await act(() => Promise.resolve())

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/Payment 1\/2/i)).toBeDefined();
    expect(screen.getByText(/Proceed to pay/i)).toBeDefined();
  });

  test('Should proceeds to the next step when customer info is submitted', async () => {
    setup();
    
    // Complete form 
    fireEvent.change(screen.getByPlaceholderText(/user@gmail.com/i), { target: { value: 'user@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Your lastname/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Your phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/Your address/i), { target: { value: '123 Street' } });
    fireEvent.change(screen.getByPlaceholderText(/Your deparment/i), { target: { value: 'NY' } });
    fireEvent.change(screen.getByPlaceholderText(/Your city/i), { target: { value: 'New York' } });

    // Send form
    fireEvent.click(screen.getByText(/Proceed to pay/i));
    await act(() => Promise.resolve())

    // Verify dispatch
    expect(store.dispatch).toHaveBeenCalledWith(
      setTemporalCustomerInfoSlice({
        email: 'user@gmail.com',
        name: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        address: '123 Street',
        deparment: 'NY',
        city: 'New York',
      }));
  });
});
