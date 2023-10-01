import connections from "../app/db";

class ProjectService {
  // 查询项目列表
  async getList(page: string, size: string) {
    const statement = `
    SELECT *
    FROM project
    LIMIT ?, ?;`;
    const [result] = await connections.execute(statement, [
      String((Number(page) - 1) * Number(size)),
      size,
    ]);

    return result;
  }
  // 列表总数据量
  async getListCounts(){
    const statement = `SELECT COUNT(*) AS counts FROM project`

    const [result] = await connections.execute(statement)
    return result
  }
  // 添加项目
  async create(
    link: string,
    title: string,
    description: string,
    cover: string,
  ) {
    const statement = `
    INSERT INTO project (
      link, 
      title, 
      description, 
      cove_url
      ) value (?, ?, ?, ?)`;

    const [result] = await connections.execute(statement, [
      link,
      title,
      description,
      cover,
    ]);
    return result;
  }
}

export default new ProjectService();
