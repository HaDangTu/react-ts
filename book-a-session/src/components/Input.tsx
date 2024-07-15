import { type ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ id, label, ...props }: InputProps) {
  return (
    <div className='control'>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}
