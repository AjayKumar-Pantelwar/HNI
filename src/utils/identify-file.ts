export function identifyFile(urlString: string) {
  if (!urlString) return 'png';
  const url = new URL(urlString);
  const extension = url.pathname.substring(url.pathname.lastIndexOf('.'));
  return extension ?? 'png';
}

export function identifyFilename(urlString: string) {
  if (!urlString) return 'no file found';
  const url = new URL(urlString);
  const filename = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
  return filename ?? 'no file found';
}
