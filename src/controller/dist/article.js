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
var articleService_1 = require("../service/articleService");
var covrtURL_1 = require("../utils/covrtURL");
var errorTypes_1 = require("../types/errorTypes");
var articleController = /** @class */ (function () {
    function articleController() {
    }
    // // 查询文章列表
    articleController.prototype.list = function (ctx) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, page, size, userId, result, counts, newResult;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = ctx.query, page = _b.page, size = _b.size;
                        userId = (_a = ctx.user) === null || _a === void 0 ? void 0 : _a.userId;
                        return [4 /*yield*/, articleService_1["default"].getList(page, size, userId)];
                    case 1:
                        result = (_c.sent());
                        return [4 /*yield*/, articleService_1["default"].getListCounts(userId)];
                    case 2:
                        counts = (_c.sent())[0].counts;
                        newResult = covrtURL_1["default"](result);
                        ctx.body = {
                            code: 201,
                            msg: "查询成功",
                            data: newResult,
                            counts: counts
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    // 查看文章详情
    articleController.prototype.detail = function (ctx) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var articleId, userId, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        articleId = ctx.params.articleId;
                        userId = (_a = ctx.user) === null || _a === void 0 ? void 0 : _a.userId;
                        return [4 /*yield*/, articleService_1["default"].getDetail(articleId)];
                    case 1:
                        result = (_b.sent());
                        if (!result) {
                            return [2 /*return*/, ctx.app.emit("error", new Error(errorTypes_1["default"].RESOURCE_DOES_NOT_EXIST), ctx)];
                        }
                        else if (userId === undefined && result.type === "private") {
                            return [2 /*return*/, ctx.app.emit("error", new Error(errorTypes_1["default"].UN_PERMISSION), ctx)];
                        }
                        // 处理数据的cover
                        result.cover = covrtURL_1["default"](result.cover);
                        ctx.body = {
                            code: 201,
                            msg: "查询成功",
                            // 处理数据的cover
                            data: result
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    // 添加博客文章
    articleController.prototype.createArticle = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, content, type, cover, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, title = _a.title, content = _a.content, type = _a.type;
                        cover = ctx.cover;
                        return [4 /*yield*/, articleService_1["default"].create(title, cover, content, type)];
                    case 1:
                        result = _b.sent();
                        ctx.body = {
                            code: 201,
                            msg: "创建成功",
                            data: result
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    // 修改博客文章
    articleController.prototype.updateArticle = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var articleId, _a, title, content, type, cover;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        articleId = ctx.params.articleId;
                        _a = ctx.request.body, title = _a.title, content = _a.content, type = _a.type;
                        cover = ctx.cover;
                        return [4 /*yield*/, articleService_1["default"].update(title, content, cover, type, articleId)];
                    case 1:
                        _b.sent();
                        ctx.body = {
                            code: 201,
                            msg: "更新成功"
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    articleController.prototype.deleteArticle = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var articleId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        articleId = ctx.params.articleId;
                        return [4 /*yield*/, articleService_1["default"]["delete"](articleId)];
                    case 1:
                        _a.sent();
                        ctx.body = {
                            code: 201,
                            msg: "删除成功"
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    return articleController;
}());
exports["default"] = new articleController();
