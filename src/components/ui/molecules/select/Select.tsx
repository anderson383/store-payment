import React, {
  useEffect,
  useRef, useState
} from 'react';
import _ from 'lodash';
import styles from './Select.module.scss';
import { useField } from 'formik';
import useClickOutside from '../../../../hooks/use-click-outside';
import { OptionType } from 'types/common';
import ReactDOM from 'react-dom';
import { IconChevronDown } from '@tabler/icons-react';
import { useWindowSize } from '../../../../hooks/use-window';

interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: OptionType[];
  viewLabel?: string;
  disabled?: boolean;
  onChange?: (value: OptionType) => void
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  name,
  options,
  viewLabel = 'label',
  disabled,
  onChange
}) => {
  const [active, setActive] = useState(false);
  const [field, meta, helpers] = useField(name);
  const portalContainer = document.getElementById('portal-root');
  const selectRef = useRef<HTMLDivElement>(null);
  const { width: widthScreen } = useWindowSize();
  const optionsRef = useRef<any>(null);


  const [popoverPosition, setPopoverPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });

  const onReziseScreen = () => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();

      setPopoverPosition({
        width: rect.width,
        top: rect.bottom,
        left: rect.left,
        height:
          window.innerHeight - rect.bottom > 128 ? null : window.innerHeight - rect.bottom - 16
      });
    }
  };


  useEffect(() => {
    onReziseScreen();
  }, [widthScreen, active]);

  const handleValue = (value: OptionType) => {
    setActive(false);
    helpers.setValue(value);
    onChange && onChange(value);
  };

  useClickOutside(optionsRef, selectRef,() => {
    setActive(false);
  });

  return (
    <div className={styles.select} >
      {label && <label htmlFor={name} >{label}</label>}
      <div className={styles.input_select}  >
        <div onClick={() => !disabled && setActive(!active)} ref={selectRef}>
          <IconChevronDown className={`${ styles.chevron }  ${ active ? styles.chevron_activ : '' }`} />
            <input
              role='textfield'
              tabIndex={0}
              disabled={disabled}
              readOnly
              id={name}
              type="text"
              onBlur={e => {
                helpers.setTouched(true);
                field.onBlur(e);
              }}
              className={styles.selectTrigger}
              placeholder={placeholder}
              value={typeof field.value === 'string' ? field.value : field.value === null ? '' : field.value?.[viewLabel]}
            />
        </div>
          {
            active && ReactDOM.createPortal(
            <div
              ref={optionsRef}
              className={`${ styles.select_options }`}
              style={{
                width: popoverPosition.width,
                top: popoverPosition.top,
                left: popoverPosition.left,
                height: popoverPosition.height,
                pointerEvents: active ? 'auto' : 'auto'
              }}
            >
              {options.map(item => (
                <div
                  className={styles.item_select}
                  key={'select-vaue' + item.value}
                  onClick={() => handleValue(item)}
                >
                  {item.label}
                </div>
              ))}
            </div>,
            portalContainer)
          }
      </div>
      {
       (meta.error && meta.touched) ? <span className={styles.error}> {meta.error} </span> : null
      }
    </div>
  );
};
