import db from "../../models";

const { User } = db;

class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }
}

export default new UserRepository();
