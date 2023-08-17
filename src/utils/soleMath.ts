function generateSoleMath() {
  const randomPart = Math.random().toString(36).substring(2, 5);
  const timestampPart = Date.now().toString(36);
  return randomPart + timestampPart;
}

export default generateSoleMath