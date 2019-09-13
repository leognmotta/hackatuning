import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import ApiError from '../../config/ApiError';

class HackathonValidator {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        subtitle: Yup.string().required(),
        description: Yup.string().required(),
        online: Yup.boolean(),
        location: Yup.string().when('online', (online, field) =>
          online ? field : field.required()
        ),
        event_date: Yup.date().required(),
        event_ending: Yup.date().required(),
        deadline_subscription: Yup.date().required(),
        deadline_team_creation: Yup.date(),
        awards: Yup.string().required(),
        min_participantsitle: Yup.number().positive(),
        max_participants: Yup.number().positive(),
      });

      await schema.validate(req.body, { abortEarly: false });

      if (parseISO(req.body.event_date) < new Date()) {
        throw new ApiError(
          'Invalid event date',
          "We can't create events in the past!",
          400
        );
      }

      if (parseISO(req.body.event_ending) < parseISO(req.body.event_date)) {
        throw new ApiError(
          'Invalid ending date',
          "The event can't end before it starts",
          400
        );
      }

      if (
        parseISO(req.body.deadline_subscription) > parseISO(req.body.event_date)
      ) {
        throw new ApiError(
          'Invalid deadline subscription date',
          'You need to end subscriptions before the event start!',
          400
        );
      }

      if (
        parseISO(req.body.deadline_team_creation) <
        parseISO(req.body.event_date)
      ) {
        throw new ApiError(
          'Invalid deadline team creation date',
          'You need to provid some time to build team after the event start!',
          400
        );
      }

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

export default new HackathonValidator();
