export function elipseText(str: string, n: number = 6) {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
}
