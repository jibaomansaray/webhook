using Dapper;
using Datastore.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections;
using TbarpetsContract.Repositories;
using TbarpetsContract.Models;

namespace Datastore.Repositories;

public class OwnerRepository: IOwnerRepository
{

  private List<string> fakeNames;
  private MySqlConnection _con;

  public OwnerRepository()
  {
    _con = new MySqlConnection("Server=db;UserId=root;Password=dbpassword;Database=dotnetpets");

    fakeNames = new List<string>();
    fakeNames.Add("John1");
    fakeNames.Add("Mary2");
    fakeNames.Add("John2");
    fakeNames.Add("Mary1");
    fakeNames.Add("A34ed");
    fakeNames.Add("CDE");
  }

  public static OwnerRepository GetInstance()
  {
    return new OwnerRepository();
  }

  public IOwnerModel Save(IOwnerModel owner)
  {
    return owner;
  }

  public List<IOwnerModel> FindAll()
  {
    List<IOwnerModel> owners = _con.Query<IOwnerModel>("select * from owners").ToList();
    return owners;
  }

  public IOwnerModel? FindOneByEmail(string email)
  {
    List<OwnerModel> owners = _con.Query<OwnerModel>($"select * from owners where email ='{email}' limit 1").ToList();
    return (owners.Count > 0)? owners.First(): null; // @todo 404 here ?!?
  }
  
  public IOwnerModel? FindOneById(int id)
  {
    List<IOwnerModel> owners = _con.Query<IOwnerModel>($"select * from owners where id={id} limit 1").ToList();
    return (owners.Count > 0)? owners.First(): null; // @todo 404 here ?!?
  }

  public List<IOwnerModel> FindByPetType(string type)
  {
    List<IOwnerModel> owners = new List<IOwnerModel>();
    owners.Add(makeOwner());
    owners.Add(makeOwner());

    return owners;
  }


  private OwnerModel makeOwner()
  {
    return new OwnerModel(getRandomString(), getRandomString(), getRandomString(), getRandomString());
  }

  private string getRandomString()
  {
    Random rnd = new Random();
    int index = rnd.Next(0, fakeNames.Count);
    return fakeNames.ElementAt(index);
  }
}