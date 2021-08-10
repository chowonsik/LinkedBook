import S3 from "react-aws-s3";

const config = {
  bucketName: "linkedbook",
  dirName: "images" /* optional */,
  region: "ap-northeast-2",
  accessKeyId: "AKIA2VNVQ3CIW7RQRMVC",
  secretAccessKey: "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",
};

const ReactS3Client = new S3(config);
export default ReactS3Client;
