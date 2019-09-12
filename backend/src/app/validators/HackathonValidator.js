import * as Yup from 'yup';
import ApiError from '../../config/ApiError';

class HackathonValidator {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        subtitle: Yup.string().required(),
        description: Yup.string().required(),
        location: Yup.string().required(),
        online: Yup.boolean().required(),
        event_date: Yup.date().required(),
        deadline_subscription: Yup.date().required(),
        awards: Yup.string().required(),
        min_participantsitle: Yup.number().positive(),
        max_participants: Yup.number().positive(),
      });

      await schema.validate(req.body);

      return next();
    } catch (error) {
      if (error.name === 'ValidationError' && error.errors[0]) {
        const validationError = new ApiError(
          'Validation Error',
          error.errors[0],
          400
        );

        return next(validationError);
      }

      return next(error);
    }
  }
}

export default new HackathonValidator();
