using System.Collections;
namespace TbarpetsContract.Models;

public interface IOwnerModel
{

  public int Id { get; }
  public string Email { set; get; }

  public string Firstname { set; get; }

  public string Middlename { set; get; }

  public string Lastname { set; get; }

  public List<IPetModel> Pets { get; }


  public IPetModel AddPet(IPetModel pet);

  // public IPetModel add(int petId);

  public IPetModel RemovePet(IPetModel pet);

  // public IPetModel remove(int petId);

}
