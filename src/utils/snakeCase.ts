export const snakeCase = (name: string) => {
  if (!name) {
    return name;
  }
  return name
    .split('-')
    .map((d) =>
      d
        .split('')
        .map((d, i) => (i === 0 ? d.toUpperCase() : d))
        .join(''),
    )
    .join(' ');
};
