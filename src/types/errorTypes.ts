// 错误处理类型声明

type NAME_OR_PASSWORD_IS_REQUIRED = "name_or_password_is_required";
type ARGUMENT_DEFICIENCY = "argument_deficiency";
type IMAGE_UPLOAD_FAILED = "image_upload_failed";
type USER_ALREADY_EXISTS = "user_already_exists";
type USER_DOES_NOT_EXISTS = "user_does_not_exists";
type PASSWORD_IS_ERROR = "password_is_error";
type UN_AUTHORIZATION = "un_authorization";
type UN_PERMISSION = "un_permission";

class ErrorType {
  NAME_OR_PASSWORD_IS_REQUIRED: NAME_OR_PASSWORD_IS_REQUIRED =
    "name_or_password_is_required";
  ARGUMENT_DEFICIENCY: ARGUMENT_DEFICIENCY = "argument_deficiency";
  IMAGE_UPLOAD_FAILED: IMAGE_UPLOAD_FAILED = "image_upload_failed";

  USER_ALREADY_EXISTS: USER_ALREADY_EXISTS = "user_already_exists";

  USER_DOES_NOT_EXISTS: USER_DOES_NOT_EXISTS = "user_does_not_exists";

  PASSWORD_IS_ERROR: PASSWORD_IS_ERROR = "password_is_error";

  UN_AUTHORIZATION: UN_AUTHORIZATION = "un_authorization";

  UN_PERMISSION: UN_PERMISSION = "un_permission";
}

export type {
  NAME_OR_PASSWORD_IS_REQUIRED,
  ARGUMENT_DEFICIENCY,
  IMAGE_UPLOAD_FAILED,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_ERROR,
  UN_AUTHORIZATION,
  UN_PERMISSION,
};

export default new ErrorType();
