using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class UserModel
    {
        [Key]
       public int userId { get; set; }
       public string userName { get; set; }
       public string userLastName { get; set; }

       public string fileName { get; set; }
    }
}
