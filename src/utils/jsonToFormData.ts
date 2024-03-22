export const jsonToFormData = (jsonData: { [key: string]: string }) => {
  const formData = new FormData();
  Object.entries(jsonData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};
