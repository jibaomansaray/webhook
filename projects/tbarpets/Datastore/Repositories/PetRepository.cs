using System;
using System.Collections;
using Datastore.Models;
using MySql.Data.MySqlClient;
using Dapper;

namespace Datastore.Repositories;

public class PetRepository
{

   public static PetRepository GetInstance()
   {
    return new PetRepository();
  }

  public PetModel CreatePet()
  {
    return new PetModel();
  }

  public List<PetModel> FindAll()
  {
    List<PetModel> collection = new();
    collection.Add(CreatePet());
    collection.Add(CreatePet());
    collection.Add(CreatePet());

    return collection;
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
  public List<PetModel> FindAllByOwnerId(int id)
  {
    List<PetModel> collection = new();
    collection.Add(CreatePet());
    collection.Add(CreatePet());
    collection.Add(CreatePet());
    collection.Add(CreatePet());

    return collection;
  }

}