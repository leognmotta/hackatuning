import { Model } from 'sequelize';

class PivotUrl extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.UserUrl, { foreignKey: 'user_url_id' });
  }
}

export default PivotUrl;
