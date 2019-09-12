import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required(),

  email: Yup.string()
    .email('Custom invalid email message')
    .required('Custom required message'),

  password: Yup.string()
    .min(6, 'Password should be at least 6 characteres')
    .required(),

  bio: Yup.string()
    .max(255)
    .required(),

  // skill: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       id: Yup.string().required(),
  //       title: Yup.string().required(),
  //     })
  //   )
  //   .required(),
});
