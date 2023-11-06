const fs = require('fs')
// 配置.env

const env = process.env || {};

const content = `
# 服务器
APP_HOST=${env.APP_HOST}
APP_PROT=${env.APP_PROT}

# 数据库
MYSQL_HOST=${env.MYSQL_HOST}
MYSQL_PORT=${env.MYSQL_PROT}
MYSQL_USER=${env.MYSQL_USER}
MYSQL_PASSWORD=${env.MYSQL_PASSWORD}
MYSQL_NAME=${env.MYSQL_NAME}

# token key
JWT_KEY=jonlyesblog
`;

fs.writeFile("../../.env", content, (err) => {
  if (err) {
    console.log(err);
  } else {
    fs.unlink("../../.env example", (err) => {
      if(err){
        console.log("删除失败:" + err);
      }else{
        console.log('删除成功');
      }
    });
    console.log(".env配置成功");
  }
});
