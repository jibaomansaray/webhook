using System.Collections;
using TbarpetsContract.Models;

namespace TbarpetsContract.Repositories;

public interface IOwnerRepository
{
  public IOwnerModel? Save(IOwnerModel owner);

  public List<IOwnerModel> FindAll();

  public IOwnerModel? FindOneByEmail(string email);

  public IOwnerModel? FindOneById(int id);

  public List<IOwnerModel> FindByPetType(string type);
}