
import {
  render,
  screen
} from '@testing-library/react';
import { act } from 'react';
import { StoreLayout } from './store.layout';

describe('Tests in Store oayout component', () => {
  const setup = () => {
    return render(
      <StoreLayout>
        <div>Contenido renderizado correctamente</div>
      </StoreLayout>
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup();
    
    await act(() => Promise.resolve())
    expect(asFragment()).toMatchSnapshot();
  });
});
