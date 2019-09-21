import * as Yup from 'yup';
import ApiError from '../../config/ApiError';

class UserValidator {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        nickname: Yup.string().required(),
        bio: Yup.string(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
        urls: Yup.array().of(
          Yup.string()
            .url('url not valid')
            .min(5)
        ),
        roles: Yup.array()
          .of(Yup.number())
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
        name: Yup.string(),
        nickname: Yup.string(),
        bio: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
        urls: Yup.array().of(
          Yup.string()
            .url('url not valid')
            .min(5)
        ),
        roles: Yup.array().of(Yup.number()),
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

export default new UserValidator();
