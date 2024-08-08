
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { act } from 'react';
import { ButtonIcon } from './ButtonIcon';
import { IconArrowLeft } from '@tabler/icons-react';

describe('Tests in ButtonIcon component', () => {
  const setup = () => {
    return render(
      <ButtonIcon icon={<IconArrowLeft />}  />
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup();
    
    await act(() => Promise.resolve())
    expect(asFragment()).toMatchSnapshot();
  });
});
