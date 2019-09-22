import Mail from '../../lib/Mail';

class ConfirmationResponseMail {
  get key() {
    return 'ConfirmationResponseMail';
  }

  async handle({ data }) {
    const { name, email } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `${name}, your email was confirmed!`,
      template: 'confirmation_response_email',
      context: {
        user: name.split(' ')[0] ? name.split(' ')[0] : name,
      },
    });
  }
}

export default new ConfirmationResponseMail();
