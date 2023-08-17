import connections from "../app/db";

class FileService {
  // 查询头像
 async getCoverFile(tableName:string, coverName:string){
    const statement = `
    SELECT cover FROM ${tableName} WHERE cover = ?`

    const [result] = await connections.execute(statement,[coverName])

    return result
  }
}

export default new FileService();
