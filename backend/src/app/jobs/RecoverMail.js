import Mail from '../../lib/Mail';

class RecoverMail {
  get key() {
    return 'RecoverMail';
  }

  async handle({ data }) {
    const { user, link } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Password recover',
      template: 'recover',
      context: {
        user: user.name,
        link,
      },
    });
  }
}

export default new RecoverMail();
