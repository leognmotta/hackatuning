import * as Yup from 'yup';
import ApiError from '../../config/ApiError';

class UserRecoverValidator {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      if (error.name === 'ValidationError' && error.errors[0]) {
        const schemaErrors = error.inner.map(err => {
          return { field: err.path, message: err.message };
        });

        const validationError = new ApiError(
          'Validation Error',
          'One or more fields is not valid.',
          400,
          schemaErrors
        );

        return next(validationError);
      }

      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().min(6),
        confirmPassword: Yup.string().when('password', (password, field) => {
          return password
            ? field.required().oneOf([Yup.ref('password')])
            : field;
        }),
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      if (error.name === 'ValidationError' && error.errors[0]) {
        const schemaErrors = error.inner.map(err => {
          return { field: err.path, message: err.message };
        });

        const validationError = new ApiError(
          'Validation Error',
          'One or more fields is not valid.',
          400,
          schemaErrors
        );

        return next(validationError);
      }

      return next(error);
    }
  }
}

export default new UserRecoverValidator();
