import Mail from '../../lib/Mail';

class NewMentorMail {
  get key() {
    return 'NewMentorMail';
  }

  async handle({ data }) {
    const { user, hackathon } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: `You are now a mentor at ${hackathon.title}`,
      template: 'new_mentor_email',
      context: {
        user: user.name.split(' ')[0] ? user.name.split(' ')[0] : user.name,
        hackathon: hackathon.title,
      },
    });
  }
}

export default new NewMentorMail();
