import Mail from '../../lib/Mail';

class RecoverSuccessMail {
  get key() {
    return 'RecoverSuccessMail';
  }

  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Password changed',
      template: 'recover_success',
      context: {
        api: process.env.APP_URL,
        user: user.name.split(' ')[0] ? user.name.split(' ')[0] : user.name,
      },
    });
  }
}

export default new RecoverSuccessMail();
