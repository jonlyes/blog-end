type CoverURLArg = { cover: string } | [{ cover: string }];

type CoverURLFn = (
  data: CoverURLArg) => object | [{}];

export { CoverURLArg,CoverURLFn };
