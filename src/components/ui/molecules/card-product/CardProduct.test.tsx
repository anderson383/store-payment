
import {
  render,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';
import { CardProduct } from './CardProduct';

describe('Tests in CardProduct component', () => {
  const setup = () => {
    return render(
      <BrowserRouter>
        <CardProduct
          to={'/test'}
          product={{
            description: 'test',
            id: 'test',
            images: [],
            name: 'test',
            price: 0,
            stock: 0
          }}
        />
      </BrowserRouter>
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup();
    
    await act(() => Promise.resolve())
    expect(asFragment()).toMatchSnapshot();
  });
});
