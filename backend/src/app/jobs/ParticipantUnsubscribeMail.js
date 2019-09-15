import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class ParticipantUnsubscribeMail {
  get key() {
    return 'ParticipantUnsubscribeMail';
  }

  async handle({ data }) {
    const { name, email, title, deadline_subscription } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `${name}, You have unsubscribed to ${title}`,
      template: 'unsubscription',
      context: {
        name,
        title,
        deadline_subscription: format(
          parseISO(deadline_subscription),
          "MMMM dd', at' H:mm'h'"
        ),
      },
    });
  }
}

export default new ParticipantUnsubscribeMail();
