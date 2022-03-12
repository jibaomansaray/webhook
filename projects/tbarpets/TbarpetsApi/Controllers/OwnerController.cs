using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using Datastore.Models;
using Datastore.Repositories;
using TbarpetsContract.Models;
using TbarpetsContract.Repositories;

namespace TbarpetsApi.Controllers;

[ApiController]
[Route("api/v1/owners")]
public class OwnerController : ControllerBase
{
  private OwnerRepository _ownerRepo;

  public OwnerController() {
    _ownerRepo = OwnerRepository.GetInstance();
  }

  // post
  [HttpPost(Name="SaveOwner")]
  [HttpPut("{email}")]
   public IOwnerModel Save( IOwnerModel owner, string email = "")
  {
    owner.Email = (email.Length > 0) ? email : owner.Email;
    return _ownerRepo.Save(owner);
  }

   [HttpGet()]
  public List<IOwnerModel> GetAll()
  {
    return _ownerRepo.FindAll();
  }

   [HttpGet("by-pet-type/{type}")]
  public List<IOwnerModel> GetAllByPetType(string type)
  {
    return _ownerRepo.FindByPetType(type);
  }

   [HttpGet("by-email/{email}")]
  public IOwnerModel? FindByEmail(string email)
  {
    return _ownerRepo.FindOneByEmail(email);
  }

   [HttpGet("by-id/{id}")]
  public IOwnerModel? FindById(int id)
  {
    return _ownerRepo.FindOneById(id);
  }
}