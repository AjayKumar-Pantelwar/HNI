import { handleError } from './handle-error';
import { identifyFile, identifyFilename } from './identify-file';

export const convertUrlToFile = async (url: string) => {
  if (!url) return null;
  const filename = identifyFilename(url);
  const extension = identifyFile(url);
  try {
    const res = await fetch(url);
    const data = await res.blob();
    const file = new File([data], filename, {
      type:
        extension === '.jpg' || extension === '.jpeg'
          ? 'image/jpg'
          : extension === '.pdf'
          ? 'application/pdf'
          : extension === '.svg'
          ? 'application/svg'
          : 'image/png',
    });
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    return file;
  } catch (error) {
    handleError(error);
    return null;
  }
};
