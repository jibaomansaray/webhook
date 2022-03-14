
namespace Datastore;

class WebhookPayload<T>
{
  public string topic { set; get; }

  public T payload { set; get; }

  public WebhookPayload(string topic, T payload)
  {
    this.topic = topic;
    this.payload = payload;
  }
}