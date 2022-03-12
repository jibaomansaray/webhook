using Microsoft.AspNetCore.Mvc;
using System.Collections;
using Datastore.Models;
using Datastore.Repositories;

namespace TbarpetsApi.Controllers;

[ApiController]
[Route("api/v1/pets")]
public class PetController: ControllerBase 
{

  private PetRepository _petRepo;

  public PetController()
  {
    _petRepo = PetRepository.GetInstance();
  }

  [HttpPost(Name="SavePet")]
  [HttpPut("{id}")]
  public PetModel Save(PetModel pet, int id = 0)
  {
    return _petRepo.CreatePet();
  }

 [HttpGet()]
  public List<PetModel> GetAll() 
  {
    return _petRepo.FindAll();
  }

  [HttpGet("by-all-owner-id/{id}")]
  public List<PetModel> GetByOwnerId(int id) 
  {
    return _petRepo.FindAllByOwnerId(id);
  }

  [HttpGet("by-all-owner-email/{email}")]
  public List<PetModel> GetByOwnerEmail(string email) 
  {
    return _petRepo.FindAllByOwnerEmail(email);
  }

}