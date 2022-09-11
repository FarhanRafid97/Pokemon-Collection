export const normalText = (text: string) => {
  return text?.replaceAll(/[\n\f]/g, ' ');
};
