namespace TbarpetsContract.Models;

public interface IPetModel
{
  public int Id { get; }

  public int OwnerId { set; get; }

  public string Type { set; get; }

  public int Count {set; get; }
}