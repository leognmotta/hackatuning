import Mail from '../../lib/Mail';

class TeamDeniedInviteMail {
  get key() {
    return 'TeamDeniedInviteMail';
  }

  async handle({ data }) {
    const { creator, hackathon, member } = data;

    await Mail.sendMail({
      to: `${creator.name} <${creator.email}>`,
      subject: 'Invitation denied',
      template: 'team_denied_invite',
      context: {
        api: process.env.APP_URL,
        creator: creator.name.split(' ')[0]
          ? creator.name.split(' ')[0]
          : creator.name,
        hackathon,
        member,
      },
    });
  }
}

export default new TeamDeniedInviteMail();
