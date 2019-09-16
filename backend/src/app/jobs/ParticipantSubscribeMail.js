import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class ParticipantSubscribeMail {
  get key() {
    return 'ParticipantSubscribeMail';
  }

  async handle({ data }) {
    console.log(data);
    const {
      name,
      email,
      hackathon_title,
      event_date,
      deadline_team_creation,
    } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `${name}, You have subscribed to ${hackathon_title}`,
      template: 'subscription',
      context: {
        name,
        hackathon_title,
        date: format(parseISO(event_date), "MMMM dd', at' H:mm'h'"),
        deadline_team_creation: format(
          parseISO(deadline_team_creation),
          "MMMM dd', at' H:mm'h'"
        ),
      },
    });
  }
}

export default new ParticipantSubscribeMail();
