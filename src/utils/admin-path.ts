const ADMIN_PATH_PATTERN = /^\/(?:[a-z]{2}(?:-[A-Za-z]{2,4})?\/)?admin(?:\/|\?|$)/;

export const isAdminPathname = (pathname: string) =>
  ADMIN_PATH_PATTERN.test(pathname);
