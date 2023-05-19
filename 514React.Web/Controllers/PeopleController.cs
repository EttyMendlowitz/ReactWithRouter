using _514React.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace _514React.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getallpeople")]
        public List<Person> GetAllPeople()
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person p)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.AddPerson(p);
        }

        [Route("getpersonbyid")]
        public Person GetPersonById(int id)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetPersonById(id);
        }

        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car c)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.AddCar(c);
        }

        [Route("getcarsforid")]
        public List<Car> GetCarsForId(int id)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetCars(id);
        }

        [HttpPost]
        [Route("deletecarsforid")]
        public void DeleteCars(int id)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.DeleteCars(id);
        }
    }
}
