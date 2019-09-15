import Mail from '../../lib/Mail';

class ConfirmMail {
  get key() {
    return 'ConfirmMail';
  }

  async handle({ data }) {
    const { user, link } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Confirm email',
      template: 'confirm_email',
      context: {
        user: user.name,
        link,
      },
    });
  }
}

export default new ConfirmMail();
