import db from "../../../../database/models";
import {
  FindByEmailRequest,
  FindByEmailResponse,
  FindByIdRequest,
  FindByIdResponse,
  SaveRequest,
  SaveResponse,
} from "../types";

const { User } = db as any;

class UserRepository {
  async findByEmail({
    email,
  }: FindByEmailRequest): Promise<FindByEmailResponse> {
    return User.findOne({ where: { email } });
  }

  async findById({
    id,
    transaction,
  }: FindByIdRequest): Promise<FindByIdResponse> {
    return User.findByPk(id, { transaction });
  }

  async save({ user, transaction }: SaveRequest): Promise<SaveResponse> {
    await user.save({ transaction });

    return { user };
  }
}

export default new UserRepository();
