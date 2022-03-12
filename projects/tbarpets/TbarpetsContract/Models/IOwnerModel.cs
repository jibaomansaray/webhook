namespace TbarpetsContract.Models;
public class IOwnerModel
{

  protected string _email = "this is working...";

  public int Id { get; }
  public string Email
  {
    set
    {
      //@todo validate email
      _email = value;
    }
    get
    {
      return _email;
    }
  }

  public string Firstname
  {
    set;
    get;
  }

  public string Middlename
  {
    set;
    get;
  }

  public string Lastname
  {
    set;
    get;
  }

}
