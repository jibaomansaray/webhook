using System;
using System.Collections;
using Datastore.Models;
using MySql.Data.MySqlClient;
using Dapper;

namespace Datastore.Repositories;

public class PetRepository
{
  private MySqlConnection _con;

   public PetRepository()
   {
    _con = new MySqlConnection("Server=db;UserId=root;Password=dbpassword;Database=dotnetpets");
   }
   public static PetRepository GetInstance()
   {
    return new PetRepository();
  }

  public PetModel CreatePet()
  {
    return new PetModel();
  }

  public PetModel? Save(PetModel pet)
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
      Datastore.DispatchToWebhook<PetModel>(topic, pet);
    }

    return pet;
  }

  public List<PetModel> FindAll()
  {
    List<PetModel> collection = new();
    collection.Add(CreatePet());
    collection.Add(CreatePet());
    collection.Add(CreatePet());

    return collection;
  }

  public PetModel? FindById(int id)
  {
    string sql = $"select * from pets where id ={id} limit 1";
    List<PetModel> pets = _con.Query<PetModel>(sql).ToList();

    return (pets.Count > 0) ? pets.First() : null;
  }


  public List<PetModel> FindAllByOwnerEmail(string email)
  {
    List<PetModel> collection = new();
    collection.Add(CreatePet());
    collection.Add(CreatePet());
    collection.Add(CreatePet());
    collection.Add(CreatePet());

    return collection;
  }
  public List<PetModel> FindAllByOwnerId(int ownerId)
  {
    string sql = $"select * from pets where owner_id ={ownerId}";
    List<PetModel> pets = _con.Query<PetModel>(sql).ToList();
    return pets;
  }

  public PetModel? FindByOwnerIdAndPetType(int ownerId, string type)
  {
    string sql = $"select * from pets where owner_id ={ownerId} and type='{type}' limit 1";
    List<PetModel> pets = _con.Query<PetModel>(sql).ToList();

    return (pets.Count > 0) ? pets.First() : null;
  }

}