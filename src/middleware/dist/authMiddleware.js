"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var errorTypes_1 = require("../types/errorTypes");
var config_1 = require("../app/config");
var authService_1 = require("../service/authService");
var passwordHandle_1 = require("../utils/passwordHandle");
// 鉴权中间件
var AuthMiddleware = /** @class */ (function () {
    function AuthMiddleware() {
    }
    // 登录校验
    AuthMiddleware.prototype.verifyLogin = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, result, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, username = _a.username, password = _a.password;
                        // 判断用户名或密码是否为空
                        if (!username || !password) {
                            return [2 /*return*/, ctx.app.emit("error", new Error(errorTypes_1["default"].NAME_OR_PASSWORD_IS_REQUIRED), ctx)];
                        }
                        return [4 /*yield*/, authService_1["default"].getUserByName(username)];
                    case 1:
                        result = (_b.sent());
                        user = result[0];
                        if (!user) {
                            return [2 /*return*/, ctx.app.emit("error", new Error(errorTypes_1["default"].USER_DOES_NOT_EXISTS), ctx)];
                        }
                        // 判断密码是否和数据库密码一致
                        if (user.password !== passwordHandle_1["default"](password)) {
                            return [2 /*return*/, ctx.app.emit("error", new Error(errorTypes_1["default"].PASSWORD_IS_ERROR), ctx)];
                        }
                        ctx.user = user;
                        return [4 /*yield*/, next()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 校验是否拥有权限，抛出错误
    AuthMiddleware.prototype.verifyAuth = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var authorization, token, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorization = ctx.headers.authorization;
                        // 没有登录
                        if (!authorization) {
                            return [2 /*return*/, ctx.app.emit("error", new Error(errorTypes_1["default"].UN_PERMISSION), ctx)];
                        }
                        token = authorization.replace("Bearer ", "");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        result = jsonwebtoken_1["default"].verify(token, config_1["default"].PUBLIC_KEY, {
                            algorithms: ["RS256"]
                        });
                        ctx.user = result;
                        return [4 /*yield*/, next()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, ctx.app.emit("error", new Error(errorTypes_1["default"].UN_AUTHORIZATION), ctx)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // 校验是否拥有权限，不抛出错误
    AuthMiddleware.prototype.checkyAuth = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var authorization, token, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorization = ctx.headers.authorization;
                        // 没有登录
                        if (!authorization) {
                            return [2 /*return*/, next()];
                        }
                        token = authorization.replace("Bearer ", "");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        result = jsonwebtoken_1["default"].verify(token, config_1["default"].PUBLIC_KEY, {
                            algorithms: ["RS256"]
                        });
                        ctx.user = result;
                        return [4 /*yield*/, next()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, next()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AuthMiddleware;
}());
exports["default"] = new AuthMiddleware();
