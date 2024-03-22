import React from 'react';
import { Button, Tooltip, Typography } from '@mui/material';
import type { TypographyProps, ButtonProps, TooltipProps } from '@mui/material';

const classes = {
  textButton: {
    padding: '0rem',
    height: '2.5rem',
    lineHeight: '1rem',
    borderRadius: '2rem',
    boxShadow: 'none',
    border: 'none',
    '&:hover': {
      boxShadow: 'none',
      border: 'none'
    }
  }
};
export interface TextButtonProps {
  /** The onClick action if button is clicked */
  onClick: ButtonProps['onClick'];
  /** The tooltip title of the button */
  tooltip: string;
  /** Will override the text inside the button */
  children: TypographyProps['children'];
  /** If the button is disabled */
  isDisabled?: boolean;
  /** Color for the button */
  color?: ButtonProps['color'];
  /** The placement of the tooltip on the button */
  tooltipPlacement?: TooltipProps['placement'];
  /** Styles for the button */
  sx?: ButtonProps['sx'];
}

function TextButton({
  onClick,
  tooltip,
  isDisabled = false,
  children,
  color = 'primary',
  tooltipPlacement = 'top',
  sx = []
}: TextButtonProps): React.ReactElement {
  return (
    <Tooltip placement={tooltipPlacement} arrow={true} title={tooltip}>
      <span>
        <Button
          onClick={onClick}
          sx={[classes.textButton, ...(Array.isArray(sx) ? sx : [sx])]}
          disabled={isDisabled}
          type="button"
          color={color}
        >
          <Typography variant="overline">{children}</Typography>
        </Button>
      </span>
    </Tooltip>
  );
}

export default TextButton;
