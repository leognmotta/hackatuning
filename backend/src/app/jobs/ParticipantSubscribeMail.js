import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class ParticipantSubscribeMail {
  get key() {
    return 'ParticipantSubscribeMail';
  }

  async handle({ data }) {
    const {
      name,
      email,
      hackathon_title,
      event_date,
      deadline_team_creation,
    } = data;

    const firstName = name.split(' ')[0] ? name.split(' ')[0] : name;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `${firstName}, You have subscribed to ${hackathon_title}`,
      template: 'subscription',
      context: {
        name: firstName,
        hackathon_title,
        date: format(parseISO(event_date), "MMMM dd', at' H:mm'h'"),
        deadline_team_creation: format(
          parseISO(deadline_team_creation),
          "MMMM dd', at' H:mm'h'"
        ),
        api: process.env.APP_URL,
      },
    });
  }
}

export default new ParticipantSubscribeMail();
