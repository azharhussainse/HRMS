import React from 'react';
import RoundedButton from '@/components/shared-components/RoundedButton';
import { useFormButton, BUTTON_TYPES } from '@/hooks/useFormButton';
import type { ButtonType } from '@/hooks/useFormButton';

export type HRMFormButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  shouldRequireFieldUpdates?: boolean;
  title?: string;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function HRMFormButton({
  children,
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  title,
  type = 'submit',
  onClick
}: HRMFormButtonProps): JSX.Element {
  const isResetButton = type === BUTTON_TYPES.RESET;
  const { isButtonDisabled, handleClick } = useFormButton({
    isDisabled,
    shouldRequireFieldUpdates,
    onClick,
    buttonType: type
  });

  const getTitle = () => {
    switch (true) {
      case Boolean(title):
        return title || '';
      case isResetButton:
        return 'Reset Form';
      default:
        return 'Form Submission';
    }
  };

  return (
    <RoundedButton
      title={getTitle()}
      type={type}
      isDisabled={isButtonDisabled}
      onClick={handleClick}
      variant={isResetButton ? 'outlined' : 'contained'}
    >
      {children}
    </RoundedButton>
  );
}

export default HRMFormButton;
