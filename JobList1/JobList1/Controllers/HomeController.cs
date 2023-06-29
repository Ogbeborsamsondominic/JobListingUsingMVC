using JobList1.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text.Json;

namespace JobList.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            string jsonFilePath = "jobs.json"; //path removed//
            string jsonContent = System.IO.File.ReadAllText(jsonFilePath);
            var jobs = JsonSerializer.Deserialize<List<Jobs>>(jsonContent);

            return View(jobs);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
