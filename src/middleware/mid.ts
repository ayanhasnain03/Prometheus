export const middleware = (req: any, res: any, next: any) => {
  const startTime = Date.now();
  next();
  const endTime = Date.now();
  console.log(`Request took ${endTime - startTime}ms`);
};
