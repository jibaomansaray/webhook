using Datastore.Models;
using Datastore.Repositories;
using System.Data;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.MySqlClient;
using TbarpetsContract.Models;
using TbarpetsContract.Repositories;
namespace Datastore;
public class Datastore 
{
  private static readonly HttpClient client = new HttpClient();

  private static readonly string url = "";
  //private static readonly string url = "http://nodejs:3001/api/dispatches/669f78874b74051e6d331b96";

  public static async Task DispatchToWebhook<T>(string topic, T payload)
  {
    if(url.Length > 0) {
      var data = new WebhookPayload<T>(topic, payload);
      var response = await client.PostAsJsonAsync<WebhookPayload<T>>(url, data);
      System.Console.WriteLine(response);
    }
  }

  public static bool RegisterServices(IServiceCollection services)
  {
    RegisterDatabaseClient(services);
    RegisterModels(services);
    RegisterRepos(services);

    return true;
  }

  private static void RegisterModels(IServiceCollection services)
  {
    services.AddScoped<IOwnerModel, OwnerModel>(); // Concret type for IOwnerModel
    services.AddScoped<IPetModel, PetModel>(); // Concret type for IPetModel
  }

  private static void RegisterRepos(IServiceCollection services)
  {
    services.AddSingleton<IOwnerRepository, OwnerRepository>();
    services.AddSingleton<IPetRepository, PetRepository>();
  }

  private static void RegisterDatabaseClient(IServiceCollection services)
  {
    services.AddSingleton<IDbConnection>(sp => new MySqlConnection("Server=db;UserId=root;Password=dbpassword;Database=dotnetpets"));
  }
}
