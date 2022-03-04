import { createConnection } from "typeorm";
import { eventRepo, deliveryRepo, endpointRepo, topicRepo, appRepo } from '../repos'
import { dispatchQueue, broadcastQueue } from '../queue'
import { DeliveryStatus } from "../types/deliverystatus";
import { deliver } from "./deliver";

createConnection().then(async (connection) => {
  // register queue processor
  dispatchQueue.process(async (job, done) => {
    const data = job.data as { eventId: number, topicId: number, appId: number };
    const event = await eventRepo().findOne(data.eventId);
    const topic = await topicRepo().findOne(data.topicId);
    const app = await appRepo().findOne(data.appId);

    const stream = await endpointRepo().findByAppAndTopicStream(app, topic, { isActive: true });

    stream.on('end', () => {
      stream.destroy()
      done()
    });

    stream.on('error', (e) => {
      console.log('error', e);
    })

    stream.on('data', async (data) => {
      const record = JSON.parse(JSON.stringify(data)) as { WebhookEndpoint_id: number }

      await deliveryRepo().save({
        endpoint: record.WebhookEndpoint_id,
        event: event.id,
        status: DeliveryStatus.PENDING,
        nextAttempt: new Date()
      });
    })
  });

  // broadcast event to external systems
  broadcastQueue.process(async (_job, done) => {
    await deliver()
    done()
    broadcastQueue.add({});
  });

  // start broadcasting
  broadcastQueue.add({});
  // broadcastQueue.add({}, { repeat: { cron: '* * * * *' } });

})




