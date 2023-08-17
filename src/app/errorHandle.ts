import {Context} from 'koa'
import  errorTypes from '../types/errorTypes'

const errorHandle = (error:Error,ctx:Context)=>{
    let message,status;
    
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;  // Bad Request
            message = "用户名或者密码不能为空"
            break;
        case errorTypes.ARGUMENT_DEFICIENCY:
            status = 400,
            message='参数错误，请检查参数是否缺少或参数字段错误'
            break;
        case errorTypes.IMAGE_UPLOAD_FAILED:
            status = 400,
            message='图片上传失败，请重新上传'
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409 // conflict
            message = "该用户已经注册，请登录"
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400  //参数错误
            message = "用户名不存在"
            break;
        case errorTypes.PASSWORD_IS_ERROR:
            status = 400 // 参数错误
            message = "密码错误"
            break;
        case errorTypes.UN_AUTHORIZATION:
            status = 401 // 验证错误
            message = '无效的token，请重新登录'
            break;
        case errorTypes.UN_PERMISSION:
            status = 401 // 验证错误
            message = '您不具备操作的权限'
            break;
        default:
            status = 404;
            message = "NOT FOUND"
            break;
    }

    ctx.body = {
        status, message
    }
}

export default errorHandle