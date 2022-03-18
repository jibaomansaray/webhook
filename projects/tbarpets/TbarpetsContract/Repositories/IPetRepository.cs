using TbarpetsContract.Models;

namespace TbarpetsContract.Repositories;

public interface IPetRepository
{

  public IPetModel CreatePet();
  public IPetModel? Save(IPetModel pet);
  public List<IPetModel> FindAll();

  public IPetModel? FindById(int id);

  public List<IPetModel> FindAllByOwnerEmail(string email);

  public List<IPetModel> FindAllByOwnerId(int ownerId);

  public IPetModel? FindByOwnerIdAndPetType(int ownerId, string type);
}
