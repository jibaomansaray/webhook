const Bull = require('bull');
import { WebhookEvent } from '../entity/WebhookEvent';

export const dispatchQueue = new Bull('webhook-dispatch-queue', {
  redis: {
     host: 'redisdb',
   }
});

export const broadcastQueue = new Bull('webhook-broadcast-queue', {
  redis: {
     host: 'redisdb',
   }
} );


export const dispatchEvent = (data: {eventId: number, topicId: number, appId: number}) => {
  try {
    dispatchQueue.add(data);
  } catch (e) {
    console.error(`could not disptatch job: ${e.message}`);
  }
}