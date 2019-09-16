import Notification from '../schemas/Notifications';

class NotificationController {
  async index(req, res, next) {
    try {
      const notifications = await Notification.find({
        user: req.userId,
        read: false,
      })
        .sort({ createdAt: 'desc' })
        .limit(20);

      return res.json(notifications);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const notifications = await Notification.findByIdAndUpdate(
        req.params.id,
        {
          read: true,
        },
        { new: true }
      );

      return res.json(notifications);
    } catch (error) {
      return next(next);
    }
  }
}

export default new NotificationController();
