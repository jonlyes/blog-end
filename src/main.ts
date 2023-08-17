import app from './app/index'
import './app/db'

import config from './app/config'

app.listen(config.APP_PROT,()=>{
    console.log('服务器启动成功~');
    
})