using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using WebApi.Data;
using WebApi.Models;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IConfiguration _db;

        public TaskController(IConfiguration db)
        {
            _db = db;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select taskId, taskName, taskDescription, taskStartDate, taskDueDate from dbo.Tasks";
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
        public JsonResult Post(TaskModel t)
        {
            string query = @"
                    insert into dbo.tasks values 
                    ('" + t.taskName + "', '"+ t.taskDescription + "', '" + t.taskStartDate + "' , '" + t.taskDueDate + @"')
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
        public JsonResult Put(TaskModel t)
        {
            string query = @"
                    update dbo.Tasks set 
                    taskName = '" + t.taskName + @"',
                    taskDescription = '"+ t.taskDescription+ @"',
                    taskStartDate = '" + t.taskStartDate + @"', 
                    taskDueDate = '" + t.taskDueDate + @"'
                    where taskId = " + t.taskId + @" 
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
                    delete from dbo.Tasks
                    where taskId = " + id + @" 
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

    }
}
