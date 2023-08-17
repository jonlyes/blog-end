import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// 加载配置信息
dotenv.config();

// 公钥私钥
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./key/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./key/public.key")
);

// 上传文件路径
const COVER_PATH = 'uploads/images'


const {
  APP_HOST,
  APP_PROT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_NAME,
} = process.env;

export default {
  APP_HOST,
  APP_PROT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_NAME,
  PRIVATE_KEY,
  PUBLIC_KEY,
  COVER_PATH
};
