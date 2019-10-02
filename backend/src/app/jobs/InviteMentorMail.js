import Mail from '../../lib/Mail';

class InviteMentorMail {
  get key() {
    return 'InviteMentorMail';
  }

  async handle({ data }) {
    const { user, hackathon, token } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: `You were invited as mentor at ${hackathon.title}`,
      template: 'invite_mentor_email',
      context: {
        user: user.name.split(' ')[0] ? user.name.split(' ')[0] : user.name,
        hackathon: hackathon.title,
        link: `${process.env.APP_URL}/v1/hackathons/${hackathon.id}/mentors/invite/${token}`,
      },
    });
  }
}

export default new InviteMentorMail();
