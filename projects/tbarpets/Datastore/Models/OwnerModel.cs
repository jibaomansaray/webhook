using TbarpetsContract.Models;

namespace Datastore.Models;

public class OwnerModel: IOwnerModel
{
  private List<PetModel> pets = new List<PetModel>();

  public OwnerModel()
  {
    Firstname = "";
    Middlename = "";
    Lastname = "";
  }

  public OwnerModel(string email, string firstname, string middlename, string lastname)
  {
    Email = email;
    Firstname = firstname;
    Middlename = middlename;
    Lastname = lastname;
  }

   public OwnerModel AppendPet(PetModel pet)
   {
    pets.Add(pet);
    return this;
  }
}