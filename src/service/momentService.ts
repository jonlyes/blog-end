import connections from "../app/db";

class momentService {
  async getList(timestamp: string, size: number) {
    const statement = `
    SELECT
     * 
    FROM moment 
    WHERE createAt < ? 
    ORDER BY createAt DESC 
    LIMIT 0,?`;
    const [result] = await connections.execute(statement, [
      timestamp,
      String(size),
    ]);

    return result;
  }

  // 获取列表数据总数
  async getListCounts() {
    const statement = `
    SELECT COUNT(*) AS counts FROM moment`;

    const [result] = await connections.execute(statement);
    return result;
  }
}

export default new momentService();
