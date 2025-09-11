
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("collecto_db", "user", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default sequelize;
