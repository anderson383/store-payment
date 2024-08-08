import {
  RefObject, useEffect
} from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, refTwo: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      console.log('clickkkkkkkkkkkkk', event.target)
      if (ref.current && !ref.current.contains(event.target as Node)&& refTwo.current && !refTwo.current.contains(event.target as Node)) {
        callback();
      }
    }

    console.log(document, 'doooooooooooo')
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref,refTwo, callback]);
}

export default useClickOutside;
