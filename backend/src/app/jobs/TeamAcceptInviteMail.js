import Mail from '../../lib/Mail';

class TeamAcceptInviteMail {
  get key() {
    return 'TeamAcceptInviteMail';
  }

  async handle({ data }) {
    const { creator, hackathon, member } = data;

    await Mail.sendMail({
      to: `${creator.name} <${creator.email}>`,
      subject: 'Invitation accepted',
      template: 'team_accepts_invite',
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

export default new TeamAcceptInviteMail();
