export const makeApiUrlFactory = (path: string): string => {
  return `${process.env.API_URL}${path}`
}
