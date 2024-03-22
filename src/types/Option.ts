export type HRMFormOptionValue = string | number;

type HRMFormOption = {
  /** Label of the option */
  label: string;
  /** Value of the option */
  value: HRMFormOptionValue;
  /** Whether the option is disabled */
  isDisabled?: boolean;
};

export default HRMFormOption;
