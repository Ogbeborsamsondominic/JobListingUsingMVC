//using JobList1.Models;
//using Microsoft.AspNetCore.Mvc;
//using System.Collections.Generic;
//using System.IO;
//using System.Text.Json;
//using System;

//namespace JobList1.Controllers
//{
//    public class JobsController : Controller
//    {
//        public IActionResult Index()
//        {
//            string jsonFilePath = Path.Combine(Environment.CurrentDirectory, "wwwroot", "jobs.json");
//            string jsonContent = System.IO.File.ReadAllText(jsonFilePath);
//            var jobs = JsonSerializer.Deserialize<List<Jobs>>(jsonContent);

//            return View(jobs);
//        }
//    }
//}
