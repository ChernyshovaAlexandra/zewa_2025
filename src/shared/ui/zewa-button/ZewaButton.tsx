import {
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  useCallback,
} from 'react';
import { StyledButton, Icon, Label } from './ZewaButton.styles';
import { Spinner } from '@vkontakte/vkui';
import { triggerImpactHaptic } from '@/helpers/haptics';

export type ZewaButtonVariant = 'white' | 'white-small' | 'blue-s' | 'blue-b' | 'play' | 'icon';

interface ZewaButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'content'> {
  variant: ZewaButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  children?: ReactNode;
  pending?: boolean;
}

export function ZewaButton({
  variant,
  onClick,
  icon,
  children,
  pending,
  ...props
}: ZewaButtonProps) {
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      triggerImpactHaptic('medium');
      onClick?.(event);
    },
    [onClick],
  );

  return (
    <StyledButton $variant={variant} onClick={handleClick} {...props}>
      {pending ? <Spinner /> : <></>}
      {icon && <Icon>{icon}</Icon>}
      {children && <Label>{children}</Label>}
    </StyledButton>
  );
}
