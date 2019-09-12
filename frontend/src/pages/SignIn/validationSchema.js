import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string()
    .email('Custom invalid email message')
    .required('Custom required message'),

  password: Yup.string()
    .min(6, 'Password should be at least 6 characteres')
    .required(),
});
