using System;
using System.Data;
using System.Collections;
using Datastore.Models;
using TbarpetsContract.Repositories;
using TbarpetsContract.Models;
using Dapper;

namespace Datastore.Repositories;

public class PetRepository: IPetRepository
{
  private IDbConnection _con;

   public PetRepository(IDbConnection con)
   {
    _con = con;
   }
  public IPetModel CreatePet()
  {
    return new PetModel();
  }

  public IPetModel? Save(IPetModel pet)
  {
    string topic = "tbarpets:pet_created";
    string sql = $"INSERT INTO `pets` (`owner_id`, `type`, `count`) VALUES ('{pet.OwnerId}', '{pet.Type}', '{pet.Count}');";

    if(pet.Id > 0) {
      sql = $"UPDATE `pets` SET  `owner_id` = '{pet.OwnerId}', `type` = '{pet.Type}', `count` = '{pet.Count}' WHERE `id` = '{pet.Id}'";
      topic = "tbarpets:owner_updated";
    }

    _con.Execute(sql);

    pet = (pet.Id > 0) ? pet : FindByOwnerIdAndPetType(pet.OwnerId, pet.Type);

    if(pet != null) {
      Datastore.DispatchToWebhook<IPetModel>(topic, pet);
    }

    return pet;
  }

  public List<IPetModel> FindAll()
  {
    List<IPetModel> collection = new();
    collection.Add(CreatePet());
    collection.Add(CreatePet());
    collection.Add(CreatePet());

    return collection;
  }

  public IPetModel? FindById(int id)
  {
    string sql = $"select * from pets where id ={id} limit 1";
    List<PetModel> pets = _con.Query<PetModel>(sql).ToList();

    return (pets.Count > 0) ? pets.First() : null;
  }


  public List<IPetModel> FindAllByOwnerEmail(string email)
  {
    List<IPetModel> collection = new();
    collection.Add(CreatePet());
    collection.Add(CreatePet());
    collection.Add(CreatePet());
    collection.Add(CreatePet());

    return collection;
  }
  public List<IPetModel> FindAllByOwnerId(int ownerId)
  {
    string sql = $"select * from pets where owner_id ={ownerId}";
    List<IPetModel> pets = _con.Query<PetModel>(sql).ToList<IPetModel>();
    Console.WriteLine($"total: {pets.Count.ToString()}");
    return pets;
  }

  public IPetModel? FindByOwnerIdAndPetType(int ownerId, string type)
  {
    string sql = $"select * from pets where owner_id ={ownerId} and type='{type}' limit 1";
    List<PetModel> pets = _con.Query<PetModel>(sql).ToList();

    return (pets.Count > 0) ? pets.First() : null;
  }

}