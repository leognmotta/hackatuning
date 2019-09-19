import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class ParticipantUnsubscribeMail {
  get key() {
    return 'ParticipantUnsubscribeMail';
  }

  async handle({ data }) {
    const { name, email, title, deadline_subscription } = data;
    const firstName = name.split(' ')[0] ? name.split(' ')[0] : name;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `${firstName}, You have unsubscribed to ${title}`,
      template: 'unsubscription',
      context: {
        name: firstName,
        title,
        deadline_subscription: format(
          parseISO(deadline_subscription),
          "MMMM dd', at' H:mm'h'"
        ),
        api: process.env.APP_URL,
      },
    });
  }
}

export default new ParticipantUnsubscribeMail();
