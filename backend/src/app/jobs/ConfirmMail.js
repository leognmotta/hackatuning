import Mail from '../../lib/Mail';

class ConfirmMail {
  get key() {
    return 'ConfirmMail';
  }

  async handle({ data }) {
    const { user, link } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Thank you for signing up, please confirm your email!',
      template: 'confirm_email',
      context: {
        user: user.name.split(' ')[0] ? user.name.split(' ')[0] : user.name,
        link,
        api: process.env.APP_URL,
      },
    });
  }
}

export default new ConfirmMail();
