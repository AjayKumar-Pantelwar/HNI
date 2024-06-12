function addValue(formData: FormData, key: string, value: any) {
  if (Array.isArray(value) && value[0] instanceof File) {
    value.forEach((val) => addValue(formData, key, val));
  } else if (value instanceof Blob) {
    formData.append(key, value);
  } else if (typeof value === 'object') {
    formData.append(key, JSON.stringify(value));
  } else {
    formData.append(key, value);
  }
}

export function convertToFD(data: any) {
  const formData = new FormData();

  if (typeof data !== 'object') {
    return formData;
  }

  Object.keys(data).forEach((key) => addValue(formData, key, data[key]));

  return formData;
}
