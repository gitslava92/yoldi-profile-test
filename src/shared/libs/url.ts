export const buildRoute = (...params: string[]): string => {
  return '/' + params.map((param) => param.replace(/^\/+/, '')).join('/');
};

export const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
