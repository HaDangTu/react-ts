import { type ComponentPropsWithoutRef } from 'react';
import { Link, type LinkProps as RouterLinkProps } from 'react-router-dom';

type ButtonProps = {
  textOnly?: boolean;
} & ComponentPropsWithoutRef<'button'>;

interface LinkProps extends RouterLinkProps {
  textOnly?: boolean;
  active?: boolean;
}

const isLink = (props: ButtonProps | LinkProps): props is LinkProps => {
  return 'to' in props;
};

export default function Button(props: ButtonProps | LinkProps) {
  const { textOnly } = props;
  const cn = `button${textOnly ? ' button--text-only' : ''}`;

  if (isLink(props)) {
    const { to, active } = props;
    return (
      <Link className={`${cn}${active ? ' active' : ''}`} to={to}>
        {props.children}
      </Link>
    );
  }

  const { children, onClick } = props;
  return <button className={cn} onClick={onClick} {...props}>{children}</button>;
}
