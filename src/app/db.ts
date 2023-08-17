import mysql from "mysql2/promise";
import config from "./config";

// 创建数据库链接池
const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  database: config.MYSQL_NAME,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
});

connections.getConnection().then((res) => {
  if (res) {
    console.log("数据库连接成功");
  } else {
    console.log("数据库连接失败", res);
  }
});

export default connections;
