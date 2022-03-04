import axios from "axios";
import { WebhookDelivery } from "../entity/WebhookDelivery";
import { WebhookEndpoint } from "../entity/WebhookEndpoint";
import { WebhookEvent } from "../entity/WebhookEvent";
import { deliveryRepo, endpointRepo } from "../repos";
import { DeliveryStatus } from "../types/deliverystatus";

const client = axios.create();

const markDeliveryAsSuccess = async (deliveryRecord: WebhookDelivery): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        deliveryRecord.status = DeliveryStatus.DELIVERED;
        await deliveryRepo().save(deliveryRecord);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    })()
  });
}

const markDeliveryAsFailure = (deliveryRecord: WebhookDelivery, endpointId: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        deliveryRecord.status = DeliveryStatus.FAILING;
        if (deliveryRecord.attempts < 5) {
          const minutes = deliveryRecord.nextAttempt.getMinutes()
          deliveryRecord.nextAttempt.setMinutes(minutes + 2);
        } else if (deliveryRecord.attempts >= 5 && deliveryRecord.attempts < 10) {
          const minutes = deliveryRecord.nextAttempt.getMinutes()
          deliveryRecord.nextAttempt.setMinutes(minutes + 5);
        } else if (deliveryRecord.attempts >= 10 && deliveryRecord.attempts < 15) {
          const hours = deliveryRecord.nextAttempt.getHours();
          deliveryRecord.nextAttempt.setHours(hours + 2);
        } else if (deliveryRecord.attempts >= 15 && deliveryRecord.attempts < 20) {
          const days = deliveryRecord.nextAttempt.getDate();
          deliveryRecord.nextAttempt.setDate(days + 2);
        } else {
          deliveryRecord.status = DeliveryStatus.FAILED;
          const endpoint = await endpointRepo().findOne(endpointId);
          if (endpoint) {
            endpoint.isActive = false;
            await endpointRepo().save(endpoint);
          }
        }

        await deliveryRepo().save(deliveryRecord)
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })()
  });
}

const doRequest = async (
  url: string,
  payload: { [key: string]: unknown },
  deliveryId: number,
  endpointId: number
): Promise<boolean> => {

  return new Promise((resolve, reject) => {
    (async () => {
      const deliveryRecord = await deliveryRepo().findOne(deliveryId);
      if (!deliveryRecord) {
        resolve(true)
        return;
      }
      deliveryRecord.status = DeliveryStatus.PROCESSING;
      await deliveryRepo().save(deliveryRecord);

      try {
        const response = await client.post(url, payload);
        if (response.status >= 200 && response.status <= 299) {
          await markDeliveryAsSuccess(deliveryRecord);
          resolve(true);
        } else {
          await markDeliveryAsFailure(deliveryRecord, endpointId);
          reject(false)
        }
      } catch (e) {
        await markDeliveryAsFailure(deliveryRecord, endpointId);
        reject(false)
      }
    })();
  });
}

const processCollection = async (collection: WebhookDelivery[]): Promise<number> => {
  return new Promise((resolve, _reject) => {
    (async () => {
      const promises: Promise<boolean>[] = [];
      collection.forEach(async (rec) => {
        const url = (typeof rec.endpoint === 'object') ? (rec.endpoint as WebhookEndpoint).url : ''
        const payload = (typeof rec.event === 'object') ? JSON.parse((rec.event as WebhookEvent).payload) : {};
        const endpointId = (typeof rec.endpoint === 'object') ? (rec.endpoint as WebhookEndpoint).id : 0;

        promises.push(doRequest(
          url,
          payload,
          rec.id,
          endpointId
        ));
      });

      await Promise.all(promises);
      resolve(promises.length)

    })()
  });
}

const processPending = async (): Promise<number> => {
  return new Promise((resolve, _reject) => {
    (async () => {
      const total = await processCollection(await deliveryRepo().findByStatus(DeliveryStatus.PENDING));
      resolve(total)
    })()
  });
}

const processFailing = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const total = await processCollection(await deliveryRepo().findByStatusAndNextAttempt(DeliveryStatus.FAILING, new Date()));
        resolve(total)
      } catch (e) {
        reject(e)
      }
    })();
  });
}
export const deliver = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        await processPending();
        await processFailing();
        resolve(true);
      } catch (e) {
        reject(e)
      }
    })();
  });
}
