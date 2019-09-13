import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import File from '../app/models/File';
import User from '../app/models/User';
import UserUrl from '../app/models/UserUrl';
import Role from '../app/models/Role';
import UserRole from '../app/models/UserRole';
import Hackathon from '../app/models/Hackathon';

const models = [Role, File, User, UserUrl, UserRole, Hackathon];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    mongoose.set('useUnifiedTopology', true);

    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
