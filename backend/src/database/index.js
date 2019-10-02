import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import File from '../app/models/File';
import User from '../app/models/User';
import Url from '../app/models/Url';
import UserUrl from '../app/models/UserUrl';
import Role from '../app/models/Role';
import UserRole from '../app/models/UserRole';
import Hackathon from '../app/models/Hackathon';
import Participant from '../app/models/Participant';
import Team from '../app/models/Team';
import TeamMember from '../app/models/TeamMember';
import Project from '../app/models/Project';
import TeamProject from '../app/models/TeamProject';
import Mentor from '../app/models/Mentor';

const models = [
  Role,
  File,
  User,
  Url,
  UserUrl,
  UserRole,
  Hackathon,
  Participant,
  Team,
  TeamMember,
  Project,
  TeamProject,
  Mentor,
];

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
