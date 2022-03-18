using System.Diagnostics;
using System.Collections;
using Microsoft.AspNetCore.Mvc;
using TbarpetsWeb.Models;
using TbarpetsContract.Models;
using TbarpetsContract.Repositories;
using Datastore.Models;
using Datastore.Repositories;

namespace TbarpetsWeb.Controllers;

public class FormController : Controller
{

  private readonly ILogger<FormController> _logger;

  private readonly IOwnerRepository _ownerRepo;
  private readonly IPetRepository _petRepo;

  public FormController(ILogger<FormController> logger, IOwnerRepository ownerRepo, IPetRepository petRepo)
  {
    _logger = logger;
    _ownerRepo = ownerRepo;
    _petRepo = petRepo;
  }

  public IActionResult Step1(string email)
  {
    // @todo check if the user already exist
    ViewData["email"] = email;
    ViewData["firstname"] = "";
    ViewData["middlename"] = "";
    ViewData["lastname"] = "";

    IOwnerModel? owner = _ownerRepo.FindOneByEmail(email);

    if (owner != null)
    {
      ViewData["firstname"] = owner.Firstname;
      ViewData["middlename"] = owner.Middlename;
      ViewData["lastname"] = owner.Lastname;
    }

    return View();
  }

  public IActionResult Step2(string email, string firstname, string lastname, string middlename = "")
  {
    IOwnerModel? owner = _ownerRepo.FindOneByEmail(email);

    owner = (owner != null) ? owner : new OwnerModel();

    owner.Email = email;
    owner.Firstname = firstname;
    owner.Lastname = lastname;
    owner.Middlename = middlename;

    _ownerRepo.Save(owner);

    return LocalRedirect($"/Form/ShowPets/{email}");
  }

  [HttpGet("/Form/ShowPets/{email}/{petId?}")]
  public IActionResult ShowPets(string email, int petId = 0)
  {

    ViewData["email"] = email;
    ViewData["type"] = "";
    ViewData["count"] = 1;
    ViewData["petId"] = petId;

    IOwnerModel owner = _ownerRepo.FindOneByEmail(email);
    List<IPetModel> pets = (owner != null) ? _petRepo.FindAllByOwnerId(owner.Id) : new List<IPetModel>();

    if (petId > 0 && pets.Count > 0)
    {

      foreach (var pet in pets)
      {
        if (pet.Id == petId)
        {
          ViewData["type"] = pet.Type;
          ViewData["count"] = pet.Count;
          break;
        }
      }
    }

    ViewData["pets"] = pets;


    return View();
  }

  public IActionResult Step3(string email, string type, int count = 1, int petId = 0)
  {
    IOwnerModel owner = _ownerRepo.FindOneByEmail(email);

    if(owner != null) {
      IPetModel pet = _petRepo.FindByOwnerIdAndPetType(owner.Id, type);
      pet = (pet != null) ? pet : _petRepo.CreatePet();
      pet.OwnerId = owner.Id;
      pet.Count = count;
      pet.Type = type;
      _petRepo.Save(pet);
    } else {
      // @todo 404
    }

     return LocalRedirect($"/Form/ShowPets/{email}");

  }
}