import Mail from '../../lib/Mail';

class RecoverMail {
  get key() {
    return 'RecoverMail';
  }

  async handle({ data }) {
    const { user, link } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Recover your password!',
      template: 'recover',
      context: {
        api: process.env.APP_URL,
        user: user.name.split(' ')[0] ? user.name.split(' ')[0] : user.name,
        link,
      },
    });
  }
}

export default new RecoverMail();
