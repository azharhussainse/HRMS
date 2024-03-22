export const PSTFormatter = () => {
  const localTime = new Date();
  return new Date(localTime.getTime() + 300 * 60000);
};
