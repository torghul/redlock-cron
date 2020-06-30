const RedlockLeader = require('redlock-leader');
const client = require('redis').createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: 6379,
  enable_offline_queue: false,
  //password: '',
  //db: 1,
  retry_strategy: function (options) {
    return Math.min(options.attempt * 100, 3000);
  }
});

const leader = new RedlockLeader({clients: [client]});
leader.start();

const CronJob = require('./index');
const cronjob = new CronJob(leader, {
  cronTime: `*/10 * * * * *`,
  onTick: onTick
})

cronjob.start();

function onTick() {
  console.log('TICK', new Date());
}
