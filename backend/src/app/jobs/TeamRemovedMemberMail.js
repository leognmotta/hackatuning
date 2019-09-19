import Mail from '../../lib/Mail';

class TeamRemovedMemberMail {
  get key() {
    return 'TeamRemovedMemberMail';
  }

  async handle({ data }) {
    const { user, hackathon, teamId } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'You have been removed from the team',
      template: 'team_removed_member',
      context: {
        api: process.env.APP_URL,
        user: user.name.split(' ')[0] ? user.name.split(' ')[0] : user.name,
        hackathon,
        teamId,
      },
    });
  }
}

export default new TeamRemovedMemberMail();
