import Mail from '../../lib/Mail';

class HackathonDeleteMail {
  get key() {
    return 'HackathonDeleteMail';
  }

  async handle({ data }) {
    const { organizer, email, title } = data;

    await Mail.sendMail({
      to: `${organizer} <${email}>`,
      subject: 'Hackathon deleted!',
      template: 'hackathon_delete',
      context: {
        api: process.env.APP_URL,
        organizer: organizer.split(' ')[0]
          ? organizer.split(' ')[0]
          : organizer,
        title,
      },
    });
  }
}

export default new HackathonDeleteMail();
