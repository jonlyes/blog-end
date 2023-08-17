import path from "path";
import fs from "fs";
import Koa from "koa";
import Router from "koa-router";
type ModeType = "default" | "auth" | "module";

// 批量注册路由
/*
  支持模式(object演示树形结构)：
    1、直接在同目录写路由文件  
    例： 
    router：{
      authRouter: Router,
      fileRouter: Router
    }

    2、按权限分路由文件夹
    列：
    router：{
      manage：{
        authRouter.ts: Router,
        fileRouter.ts:Router
      },
      protal：{
        projectRouter.ts: Router,
        fileRouter.ts:Router
      },
    }

    3、按功能分模块
    例：
    router：{
      auth：{
        index.ts: Router
      },
      file：{
        index.ts: Router
      },
    }
**/
const useRouters = (app: Koa, mode: ModeType = "default") => {
  const router: Router = new Router();

  const files = fs.readdirSync(__dirname);

  files.forEach((file) => {
    // 过滤index文件
    if (file === "index.ts" || file === "index.js") return;

    const filePath = path.resolve(__dirname, file);

    // 判断是否为路由文件夹
    const isRouterFile: boolean = fs.statSync(filePath).isDirectory();

    switch (mode) {
      case "default":
        // 模式一
        // 过滤文件夹
        if (isRouterFile) return;
        
        const routerModule: Router = require(filePath).default;

        // 注册路由
        router.use(routerModule.routes());
        break;
      case "auth":
        // 模式二
        if (!isRouterFile)
          return new Error(
            "The router file structure is inconsistent with the selected mode"
          );
        const routerDir = new Router({
          prefix: `/${file}`,
        });

        const routerFiles = fs.readdirSync(filePath);

        routerFiles.forEach((routerFile) => {
          if (routerFile.endsWith(".ts") || routerFile.endsWith(".js")) {
            const routerModule: Router = require(path.resolve(
              filePath,
              routerFile
            )).default;

            // 注册路由
            routerDir.use(routerModule.routes());
          }
        });

        // 注册路由
        router.use(routerDir.routes());
        break;
      case "module":
        if (!isRouterFile)
          return new Error(
            "The router file structure is inconsistent with the selected mode"
          );
        // 模式三
        const routerFile: Router =
          require(path.join(filePath, "index.ts")).default ||
          require(path.join(filePath, "index.js")).default;

        // 注册路由
        router.use(routerFile.routes());
        break;
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default useRouters;
