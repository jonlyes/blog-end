import connections from "../app/db";
import { visibleType} from '../types/article'

class articleService {
  // 查询文章列表
  async getList(page: string, size: string, userId: string = "0") {
    const statement = `
    SELECT 
      a.id,
      a.title,
      a.cover,
      a.type,
      a.createAt,
      a.updateAt
    FROM article AS a
    WHERE type = 'public' 
    OR (
      EXISTS (
        SELECT * 
        FROM user AS u
        WHERE u.id = ? 
      )
    )
    LIMIT ?, ?;`;

    const [result] = await connections.execute(statement, [
      String(userId),
      String((Number(page) - 1) * Number(size)),
      size,
    ]);

    return result;
  }
  async getDetail(articleId: string, userId: string = "undefine") {
    // 查询文章详情
    const statement = `
    SELECT * 
    FROM article AS a 
    WHERE a.id = ? 
    AND (
       type = 'public' OR (
        EXISTS (
          SELECT * FROM user AS u WHERE u.id = ?
        )
       )
    );`;
    const [result] = await connections.execute(statement, [
      String(articleId),
      String(userId),
    ]);
    return result;
  }

  // 添加博客文章
  async create(
    title: string,
    cover: string,
    content: string,
    type: visibleType
  ) {
    const statement = `
    INSERT INTO article (title,content,cover_url,type) value (?, ?, ?, ?)`;

    const [result] = await connections.execute(statement, [
      title,
      content,
      cover,
      type,
    ]);
    return result;
  }
}

export default new articleService();
