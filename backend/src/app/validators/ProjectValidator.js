import * as Yup from 'yup';
import ApiError from '../../config/ApiError';

class ProjectValidator {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        url: Yup.string()
          .url()
          .required(),
        description: Yup.string().required(),
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
        title: Yup.string(),
        url: Yup.string().url(),
        description: Yup.string(),
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

export default new ProjectValidator();
