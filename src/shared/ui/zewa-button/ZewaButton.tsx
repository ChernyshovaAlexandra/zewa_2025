import { type ReactNode } from 'react';
import { StyledButton, Icon, Label } from './ZewaButton.styles';

export type ZewaButtonVariant = 'white' | 'white-small' | 'blue-s' | 'blue-b' | 'play' | 'icon';

interface ZewaButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'content'> {
  variant: ZewaButtonVariant;
  onClick?: () => void;
  icon?: ReactNode;
  children?: ReactNode;
}

export function ZewaButton({ variant, onClick, icon, children, ...props }: ZewaButtonProps) {
  return (
    <StyledButton $variant={variant} onClick={onClick} {...props}>
      {icon && <Icon>{icon}</Icon>}
      {children && <Label>{children}</Label>}
    </StyledButton>
  );
}
