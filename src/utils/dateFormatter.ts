export const DateTimeConverter = (dateString: string) => {
  const dateObj = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  return dateObj.toLocaleString('en-US', options);
};

export function formatDateRange(startDate: string, endDate: string) {
  const options = { day: 'numeric', month: 'long' } as const;
  const formatter = new Intl.DateTimeFormat(undefined, options);
  const formattedStartDate = formatter.format(new Date(startDate));
  const formattedEndDate = formatter.format(new Date(endDate));
  return `${formattedStartDate} To ${formattedEndDate}`;
}
export const formatTime = (value: number) => {
  return value < 10 ? `0${value}` : value;
};
