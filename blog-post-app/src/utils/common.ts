export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  // Is date from this year?
  const isThisYear = date.getFullYear() === new Date().getFullYear();

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: isThisYear ? undefined : "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
