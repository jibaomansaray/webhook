import { createConnection } from "typeorm";
import { eventRepo, deliveryRepo, endpointRepo, topicRepo, appRepo } from '../repos'
import { dispatchQueue, broadcastQueue } from '../queue'


// register queue processor
dispatchQueue.process((job, done) => {
  createConnection().then(async (connection) => {
    console.log('reading.....')
    console.table(job.data);
    const data = job.data as { eventId: number, topicId: number, appId: number };
    const event = await eventRepo().findOne(data.eventId);
    const topic = await topicRepo().findOne(data.topicId);
    const app = await appRepo().findOne(data.appId);

    connection.close();
    done()
  }).catch(() => {
    done();
  });
});


// broadcast event to external systems
broadcastQueue.process((job, done) => { 
  createConnection().then(async (connection) => {
    console.log('try broadcasting....: 1' + Date.now())
    connection.close();

    // plock the next batch
    done();
    broadcastQueue.add({});
  }).catch(() => {
    done()
  })
});


// start broad casting
broadcastQueue.add({});

