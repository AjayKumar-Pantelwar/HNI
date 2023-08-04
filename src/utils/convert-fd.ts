export function convertToFD(data: any) {
  const formData = new FormData();

  if (typeof data !== 'object') {
    return formData;
  }

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, data[key]);
    }
  });

  return formData;
}
