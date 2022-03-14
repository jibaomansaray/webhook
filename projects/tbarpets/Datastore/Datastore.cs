using System.Threading.Tasks;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
namespace Datastore;
public class Datastore 
{
  private static readonly HttpClient client = new HttpClient();

  private static readonly string url = "http://nodejs:3001/api/dispatches/669f78874b74051e6d331b96";

  public static async Task DispatchToWebhook<T>(string topic, T payload)
  {
    if(url.Length > 0) {
      var data = new WebhookPayload<T>(topic, payload);
      var response = await client.PostAsJsonAsync<WebhookPayload<T>>(url, data);
      System.Console.WriteLine(response);
    }
  }
}
