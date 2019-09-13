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
      template: 'recoverSuccess',
      context: {
        user: user.name,
      },
    });
  }
}

export default new RecoverSuccessMail();
