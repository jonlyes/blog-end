import { Article } from "../types/article";
import { Project } from "../types/project";

// 更新article或project表的cover_url 返回sql语句

type updateTableOptions = Article | Project;
type tableName = "article" | "project";

type updateTablerFn = (
  options: updateTableOptions,
  tableName: tableName,
  id:string
) => string;

const updateTableHandle:updateTablerFn = (options,tableName,id) => {
    let statement=''
    console.log(typeof options);
    
    // 处理key值
    // for (){}
    
    return ''
};
  
export default updateTableHandle