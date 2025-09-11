import db from "../../models";
import { Transaction as SequelizeTransaction } from "sequelize";

const { User } = db;

class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async findById(id: number, transaction?: SequelizeTransaction) {
    return User.findByPk(id, { transaction });
  }

  async save(user: typeof User, transaction: SequelizeTransaction) {
    await user.save({ transaction });
  }
}

export default new UserRepository();
