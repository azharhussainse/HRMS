import React from 'react';
import { Button, Typography } from '@mui/material';
import type { ButtonProps } from '@mui/material';

export type RoundedButtonProps = {
  /** The title of the button */
  title: string;
  /** The onClick action if not of type "submit" */
  onClick?: ButtonProps['onClick'];
  /** Will override the text inside the button */
  children?: React.ReactNode;
  /** If the button is disabled */
  isDisabled?: boolean;
  /** The style of a button, primary/secondary/success */
  color?: ButtonProps['color'];
  /** If the button contained or outlined */
  variant?: ButtonProps['variant'];
  /** An <Icon> component that prepends button text */
  startIcon?: React.ReactNode;
  /** An <Icon> component that appends button text */
  endIcon?: React.ReactNode;
  /** Type of button, defaults to 'button' */
  type?: ButtonProps['type'];
  /** MUI sx prop */
  sx?: ButtonProps['sx'];
};

const styles = {
  roundedButton: {
    height: '2.5rem',
    minWidth: '90px',
    lineHeight: '1rem',
    border: '2px solid var(--button-primary)',
    borderRadius: '2rem',
    boxShadow: 'none',
    textTransform: 'capitalize',
    '&:hover': {
      boxShadow: 'none'
    }
  },
  primary: {
    backgroundColor: 'var(--button-primary)',
    color: 'var(--color-white)',
    border: '2px solid transparent',
    '&:hover': {
      backgroundColor: 'var(--button-primary-hover)',
      color: 'var(--color-white)'
    },
    '&:disabled': {
      color: 'var(--color-white)',
      backgroundColor: '#8A8889'
    }
  },
  secondary: {
    backgroundColor: 'var(--color-white)',
    color: 'var(--button-secondary)',
    border: '2px solid var(--button-secondary)',
    '&:hover': {
      backgroundColor: 'var(--button-secondary-hover)',
      color: 'var(--button-secondary)',
      border: '2px solid var(--button-secondary)'
    },
    '&:disabled': {
      color: '#8A8889',
      backgroundColor: 'var(--color-white)',
      border: '2px solid #8A8889'
    }
  },
  success: {
    backgroundColor: 'var(--color-palmLeaf)',
    color: 'var(--color-white)',
    border: '2px solid transparent',
    '&:hover': {
      backgroundColor: 'var(--color-button-hover-success)',
      color: 'var(--color-white)'
    }
  }
};

const getButtonStyleType = (
  isGhostButton: boolean,
  isSuccessButton: boolean
) => {
  if (isGhostButton && !isSuccessButton) {
    return 'secondary';
  }
  if (!isGhostButton) {
    if (isSuccessButton) {
      return 'success';
    } else {
      return 'primary';
    }
  }
};

function RoundedButton({
  onClick,
  title,
  isDisabled = false,
  color = 'primary',
  variant = 'contained',
  children,
  startIcon,
  endIcon,
  sx = [],
  type = 'button'
}: RoundedButtonProps) {
  const isGhostButton = React.useMemo(() => {
    return variant === 'outlined';
  }, [variant]);

  const isSuccessButton = React.useMemo(() => {
    return color === 'success';
  }, [color]);

  const buttonStyleType = getButtonStyleType(isGhostButton, isSuccessButton);

  return (
    <Button
      key={title}
      title={title}
      onClick={onClick}
      sx={[
        styles.roundedButton,
        buttonStyleType ? styles[buttonStyleType] : {},
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      disabled={isDisabled}
      variant={variant}
      color={isSuccessButton ? 'success' : color}
      startIcon={startIcon}
      endIcon={endIcon}
      type={type}
    >
      <Typography variant="button">{children}</Typography>
    </Button>
  );
}

export default RoundedButton;
