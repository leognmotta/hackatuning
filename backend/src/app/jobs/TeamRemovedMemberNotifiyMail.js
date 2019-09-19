import Mail from '../../lib/Mail';

class TeamRemovedMemberNotifiyMail {
  get key() {
    return 'TeamRemovedMemberNotifiyMail';
  }

  async handle({ data }) {
    const { creator, hackathon, teamId, member } = data;

    await Mail.sendMail({
      to: `${creator.name} <${creator.email}>`,
      subject: 'You have been removed from the team',
      template: 'team_removed_member_notify',
      context: {
        api: process.env.APP_URL,
        creator: creator.name.split(' ')[0]
          ? creator.name.split(' ')[0]
          : creator.name,
        hackathon,
        teamId,
        member,
      },
    });
  }
}

export default new TeamRemovedMemberNotifiyMail();
