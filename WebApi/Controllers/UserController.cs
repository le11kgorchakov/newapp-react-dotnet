using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _db;
        private readonly IWebHostEnvironment _env;
        public UserController(IConfiguration db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select userId, userName, userLastName, fileName, taskName from dbo.Users";
            DataTable table = new DataTable();
            string sqlDataSource = _db.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(UserModel u)
        {
            string query = @"
                    insert into dbo.Users values 
                    ('" + u.userName + "', '" + u.userLastName + "', '" + u.fileName + "','" + u.taskName + @"')
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _db.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(UserModel u)
        {
            string query = @"
                    update dbo.Users set 
                    userName = '" + u.userName + @"',
                    userLastName = '" + u.userLastName + @"',
                    fileName = '" + u.fileName + @"',
                    taskName = '" + u.taskName + @"'
                    where userId = " + u.userId + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _db.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Users
                    where userId = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _db.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [Route("savefile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }

        [Route("getfile/{filename}")]
        [HttpGet]
        
        public FileStreamResult GetFile(string filename)
        {
            try
            {
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                var file = System.IO.File.OpenRead(physicalPath);
                              
                file.Position = 0;

                return new FileStreamResult(file, new MediaTypeHeaderValue("image/jpeg"))
                    {
                        FileDownloadName = filename,
                    };
            }
            catch (Exception error)
            {
                return null;
            }
        }
    }
}
