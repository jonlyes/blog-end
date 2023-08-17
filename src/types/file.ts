interface CoverOptions {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface UploadCoverFile {
  tableName: string;
  coverId: string;
}



export { CoverOptions, UploadCoverFile};
