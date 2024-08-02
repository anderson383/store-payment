import styles from './TextField.module.scss';
import { useField } from 'formik';
import { useEffect } from 'react';
interface TextFieldProps {
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  disableError?: boolean;
  props?: Record<string, any>;
  variant?: 'filled' | 'outlined' | 'standard';
  size?: 'fullwidth' | 'md';
}

export const TextField:React.FC<TextFieldProps> = ({
  name,
  placeholder,
  type = 'text',
  className,
  label,
  disableError = false,
  props,
  variant = 'filled',
  disabled,
  size = 'md'
}) => {
  const [field, meta, helpers] = useField(name);
  
  useEffect(() => {
    props?.onChange && props.onChange(field.value)
  }, [field.value])

  return (
    <div className={`${styles.textField} ${styles['textField__' + size]}`}>
      <label htmlFor={name}> { label } </label>
      <input
        id={name}
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        {...props}
        {...field}
        type={type}
      />
      {
       (meta?.error && meta.touched) ? <span className={styles.error}> {meta.error} </span> : null
      }
    </div>
  );
};
