export const randomString = () => {
  // I would likely use a library like UUID for this in reality
  return "A66DE90XX";
};

export const errorReferenceCode = () => {
  const timestamp = new Date().getTime();
  return `ERR-${timestamp}-${randomString()}`;
};
