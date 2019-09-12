import * as Yup from 'yup';
import ApiError from '../../config/ApiError';

class SessionValidator {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
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

export default new SessionValidator();
