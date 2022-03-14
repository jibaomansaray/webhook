
using TbarpetsContract.Models;

namespace Datastore.Models;

public class PetModel: IPetModel
{

  public int Id { get; } = 0;

  public int OwnerId { set; get; }

  public string Type { set; get; } = "";

  public int Count { set; get; } = 1;



  public void SetOwner(OwnerModel owner)
  {
    OwnerId = owner.Id;
  }

  public void SetOwner(int ownerId)
  {
    OwnerId = ownerId;
  }

}