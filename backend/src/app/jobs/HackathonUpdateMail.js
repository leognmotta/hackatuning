import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class HackathonUpdateMail {
  get key() {
    return 'HackathonUpdateMail';
  }

  async handle({ data }) {
    const {
      organizer,
      email,
      title,
      event_date,
      event_ending,
      deadline_subscription,
      deadline_team_creation,
    } = data;

    await Mail.sendMail({
      to: `${organizer} <${email}>`,
      subject: 'Hackathon updated!',
      template: 'hackathon_update',
      context: {
        organizer,
        title,
        date: format(parseISO(event_date), "MMMM dd', at' H:mm'h'"),
        event_ending: format(parseISO(event_ending), "MMMM dd', at' H:mm'h'"),
        deadline_subscription: format(
          parseISO(deadline_subscription),
          "MMMM dd', at' H:mm'h'"
        ),
        deadline_team_creation: format(
          parseISO(deadline_team_creation),
          "MMMM dd', at' H:mm'h'"
        ),
      },
    });
  }
}

export default new HackathonUpdateMail();
