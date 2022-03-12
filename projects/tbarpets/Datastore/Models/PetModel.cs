namespace Datastore.Models;

public class PetModel
{

  public int Id { get; } = 0;

  public int Owner { set; get; } = 0;

  public string Type { set; get; } = "";

  public int Count { set; get; } = 1;

  public void SetOwner(OwnerModel owner)
  {
    Owner = owner.Id;
  }

  public void SetOwner(int ownerId)
  {
    Owner = ownerId;
  }

}