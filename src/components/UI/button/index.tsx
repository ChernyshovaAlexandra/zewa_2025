import React, { useCallback } from 'react';
import { ButtonProps, StyledButton } from './style';

const ButtonComponent: React.FC<ButtonProps> = ({
  variant = 'regular',
  children,
  onClick,
  disabled = false,
  style,
}) => {
  const triggerClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <StyledButton style={style} disabled={disabled} variant={variant} onClick={triggerClick}>
      {children}
    </StyledButton>
  );
};

export default React.memo(ButtonComponent);
