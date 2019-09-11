import * as Yup from 'yup';

export default {
  storeUser: Yup.object().shape({
    first_name: Yup.string().required(),

    last_name: Yup.string().required(),

    email: Yup.string()
      .email()
      .required(),

    password: Yup.string()
      .required()
      .min(6),

    confirm_password: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  }),

  updateUser: Yup.object().shape({
    first_name: Yup.string(),

    last_name: Yup.string(),

    email: Yup.string().email(),

    old_password: Yup.string().min(6),

    password: Yup.string()
      .min(6)
      .when('old_password', (old_password, field) =>
        old_password ? field.required() : field
      ),

    confirm_password: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  }),

  storeSession: Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),

    password: Yup.string()
      .required()
      .min(6),
  }),

  storeMeetup: Yup.object().shape({
    title: Yup.string().required(),

    file_id: Yup.number().required(),

    description: Yup.string().required(),

    location: Yup.string().required(),

    date: Yup.date().required(),
  }),
};
