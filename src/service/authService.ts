import connections from "../app/db";

class AuthService {
  //   查询用户
  async getUserByName(username: string) {
    const statement = `
    SELECT *
    FROM user
    WHERE username = ?`;
    const [result] = await connections.execute(statement, [username]);

    return result;
  }
  // 创建用户
  async createUser(username: string, password: string) {
    const statement = `
    INSERT INTO user (username,password) value (?,?)`;
    const [result] = await connections.execute(statement,[username,password])
    return result
  }
}

export default new AuthService();
