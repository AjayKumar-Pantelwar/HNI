export function identifyFile(urlString: string) {
  if (!urlString) return 'png';
  try {
    const url = new URL(urlString);
    const extension = url.pathname.substring(url.pathname.lastIndexOf('.'));
    return extension ?? 'png';
  } catch (error) {
    return 'Invalid file';
  }
}

export function identifyFilename(urlString: string) {
  if (!urlString) return 'no file found';
  try {
    const url = new URL(urlString);
    const filename = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
    if (filename?.length > 24) {
      const extension = filename.split('.').pop();
      return `${filename.slice(0, 15)}...${extension}`;
    }
    return filename ?? 'no file found';
  } catch (error) {
    return 'Invalid url';
  }
}
