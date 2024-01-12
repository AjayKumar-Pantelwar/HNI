import { identifyFile, identifyFilename } from './identify-file';

export const convertUrlToFile = async (url: string) => {
  const filename = identifyFilename(url);
  const extension = identifyFile(url);
  const res = await fetch(url);
  const data = await res.blob();
  const file = new File([data], filename, {
    type:
      extension === '.jpg' ? 'image/jpeg' : extension === '.pdf' ? 'application/pdf' : 'image/png',
  });
  Object.assign(file, {
    preview: URL.createObjectURL(file),
  });
  return file;
};
