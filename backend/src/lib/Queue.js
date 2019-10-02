import Bee from 'bee-queue';

import redisConfig from '../config/redis';
import RecoverMail from '../app/jobs/RecoverMail';
import RecoverSuccessMail from '../app/jobs/RecoverSuccessMail';
import HackathonCreationMail from '../app/jobs/HackathonCreationMail';
import HackathonUpdateMail from '../app/jobs/HackathonUpdateMail';
import HackathonDeleteMail from '../app/jobs/HackathonDeleteMail';
import ParticipantSubscribeMail from '../app/jobs/ParticipantSubscribeMail';
import ParticipantUnsubscribeMail from '../app/jobs/ParticipantUnsubscribeMail';
import ConfirmMail from '../app/jobs/ConfirmMail';
import TeamInviteMail from '../app/jobs/TeamInviteMail';
import TeamRemovedMemberMail from '../app/jobs/TeamRemovedMemberMail';
import TeamRemovedMemberNotifiyMail from '../app/jobs/TeamRemovedMemberNotifiyMail';
import TeamAcceptInviteMail from '../app/jobs/TeamAcceptInviteMail';
import TeamDeniedInviteMail from '../app/jobs/TeamDeniedInviteMail';
import ConfirmationResponseMail from '../app/jobs/ConfirmationResponseMail';
import InviteMentorMail from '../app/jobs/InviteMentorMail';
import NewMentorMail from '../app/jobs/newMentorMail';

const jobs = [
  RecoverMail,
  RecoverSuccessMail,
  HackathonCreationMail,
  HackathonUpdateMail,
  HackathonDeleteMail,
  ParticipantSubscribeMail,
  ParticipantUnsubscribeMail,
  ConfirmMail,
  TeamInviteMail,
  TeamRemovedMemberMail,
  TeamRemovedMemberNotifiyMail,
  TeamAcceptInviteMail,
  TeamDeniedInviteMail,
  ConfirmationResponseMail,
  InviteMentorMail,
  NewMentorMail,
];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    // eslint-disable-next-line no-console
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
