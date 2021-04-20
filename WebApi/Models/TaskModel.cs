using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class TaskModel
    {
        [Key]
        public int taskId { get; set; }
        public string taskName { get; set; }
        public string taskDescription { get; set; }
        public string taskStartDate { get; set; }
        public string taskDueDate { get; set; }
    }
}
