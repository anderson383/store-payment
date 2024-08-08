
import {
  render,
  screen
} from '@testing-library/react';
import { act } from 'react';
import Modal from './modal';
import { createRoot } from 'react-dom/client';
describe('Tests in Modal component', () => {

  const setOpenModal = jest.fn()

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

  const setup = () => {
    return render(
      <Modal
        openModal={true}
        setOpenModal={setOpenModal}
      >
        <p>Render modal</p>
      </Modal>
    );
  };

  test('Should render the component', async () => {
    const {asFragment, debug} = setup();
    expect(screen.getByText('Render modal')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
