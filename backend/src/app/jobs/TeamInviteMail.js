import Mail from '../../lib/Mail';

class TeamInviteMail {
  get key() {
    return 'TeamInviteMail';
  }

  async handle({ data }) {
    const { user, link, hackathon, creator } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Team Invitation',
      template: 'team_invitation',
      context: {
        user: user.name.split(' ')[0] ? user.name.split(' ')[0] : user.name,
        hackathon,
        creator,
        link,
        api: process.env.APP_URL,
      },
    });
  }
}

export default new TeamInviteMail();
