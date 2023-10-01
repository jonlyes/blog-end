import connections from "../app/db";
import { visibleType } from "../types/article";

class articleService {
  // 查询文章列表
  async getList(page: string, size: string, userId: string = "0") {
    const statement = !Number(userId)
      ? `
    SELECT 
      a.id,
      a.title,
      a.cover,
      a.type,
      a.createAt,
      a.updateAt
    FROM article AS a
    WHERE type = 'public' 
    LIMIT ?, ?;
    `
      : `
    SELECT 
      a.id,
      a.title,
      a.cover,
      a.type,
      a.createAt,
      a.updateAt
    FROM article AS a
    LIMIT ?, ?;`;
    
    const [result] = await connections.execute(statement, [
      String((Number(page) - 1) * Number(size)),
      size,
    ]);

    return result;
  }

  async getListCounts(userId: string = "0") {
    const statement = !Number(userId)
      ? `
    SElECT COUNT(*) as counts FROM article WHERE type = 'public'`
      : `
    SELECT COUNT(*) as counts FROM article`;
    
    const [result] = await connections.execute(statement);
    return result;
  }

  async getDetail(articleId: string) {
    // 查询文章详情
    const statement = `
    SELECT * 
    FROM article AS a 
    WHERE a.id = ? `;

    const [result] = await connections.execute(statement, [String(articleId)]);
    return result;
  }

  // 添加博客文章
  async create(
    title: string,
    cover: string,
    content: string,
    type: visibleType,
    imgList: string[]
  ) {
    const statement = `
    INSERT INTO article (title,content,cover,type,imgList) value (?, ?, ?, ?)`;

    const [result] = await connections.execute(statement, [
      title,
      content,
      cover,
      type,
      imgList,
    ]);
    return result;
  }
}

export default new articleService();
