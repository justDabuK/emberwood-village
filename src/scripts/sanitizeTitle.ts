export const sanitizeTitle = (title: string): string =>
  title
    .replaceAll(" ", "-")
    .replaceAll(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
