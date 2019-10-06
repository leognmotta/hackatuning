import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        nickname: Sequelize.STRING,
        bio: Sequelize.TEXT,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        calendly: Sequelize.STRING,
        recover_pass_token: Sequelize.TEXT,
        confirm_email: Sequelize.BOOLEAN,
        is_mentor: Sequelize.BOOLEAN,
        confirm_email_token: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });

    this.belongsToMany(models.Role, {
      through: 'UserRole',
      as: 'roles',
      foreignKey: 'user_id',
    });

    this.belongsToMany(models.Hackathon, {
      through: 'Participant',
      as: 'participants',
      foreignKey: 'user_id',
    });

    this.belongsToMany(models.Url, {
      through: 'UserUrl',
      as: 'urls',
      foreignKey: 'user_id',
    });

    this.belongsToMany(models.Team, {
      through: 'TeamMember',
      as: 'members',
      foreignKey: 'member_id',
    });

    this.belongsTo(models.TeamMember, {
      foreignKey: 'id',
      as: 'member',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
