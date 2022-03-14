using TbarpetsContract.Models;

namespace Datastore.Models;

public class OwnerModel: IOwnerModel
{

  protected string _email = "";

  public int Id { get; }
  public string Email {
    set {
      _email = value;
    }
    get {
      return _email;
    }
  }

  public string Firstname { set; get; } = "";

  public string Middlename { set; get; } = "";

  public string Lastname { set; get; } = "";

  public List<IPetModel> Pets { get; }

  public OwnerModel()
  {
    Firstname = "";
    Middlename = "";
    Lastname = "";
    Pets = new List<IPetModel>();
  }

  public OwnerModel(string email, string firstname, string middlename, string lastname)
  {
    Email = email;
    Firstname = firstname;
    Middlename = middlename;
    Lastname = lastname;
    Pets = new List<IPetModel>();
  }

   public OwnerModel AppendPet(PetModel pet)
   {
    Pets.Add(pet);
    return this;
  }

  public IPetModel AddPet(IPetModel pet) {
    Pets.Add(pet);
    return pet;
  }

  public IPetModel RemovePet(IPetModel pet) {
    // @todo remove pet from list
    return pet;
  }
}