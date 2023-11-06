// const fs = require('fs')
import fs from 'fs'
// 配置.env

const env =  process.env || {}

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
`
console.log(content);

fs.writeFile('../../.env1', content, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(content);
        console.log('.env配置成功');
    }
})