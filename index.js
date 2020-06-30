let OriginCronJob = require('cron').CronJob

class CronJob {
  constructor(leader, options) {
    this.leader = leader;

    const originalOnTick = options.onTick;

    options.onTick = () => {
      if (this.leader.isLeader) {
        originalOnTick();
      }
    };

    this.job = new OriginCronJob(options);
  }

  start() {
    this.job.start();
  }

  stop() {
    this.job.stop();
  }
}

module.exports = CronJob;
