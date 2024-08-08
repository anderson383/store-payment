
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Button } from './Button';
import { act } from 'react';

const onClickMock = jest.fn()


describe('Tests in Button component', () => {
  const setup = () => {
    return render(
      <BrowserRouter>
        <Button text='Test Button' color='primary' onClick={onClickMock}   />
      </BrowserRouter>
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup();
    
    await act(() => Promise.resolve())
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should click button', async () => {
    // Arrange
    const {asFragment} = setup();
    
    const button = screen.getByText('Test Button');

    fireEvent.click(button)
    
    // Assert
    expect(onClickMock).toBeCalled();
  });
});
