using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

using Commom_ASP_Core_Razor.Models;
/// using Commom_ASP_Core_Razor.Helpers;

using Newtonsoft.Json;
using System.Drawing;
using System.Security.Cryptography;
using System.Text;
using System;

namespace Commom_ASP_Core_Razor.Pages
{
    public class IndexModel : PageModel
    {
        public MyModel[] ArrayModel;
        public Random myRandom = new Random();

        public void OnGet()
        {
            MyModel[]  localArrayModel = new MyModel[16];

            int[] arr = new int[16];
            for (int i = 0; i < 15; i++)
                arr[i] = i + 1;
            arr[15] = -1;

            for (int i = 14; i > 0; i--)
            {
                int R = myRandom.Next(i);
                int temp = arr[i];
                arr[i] = arr[R];
                arr[R] = temp;
            }

            for (int i = 0; i < 16; i++)
            {

                localArrayModel[i] = new MyModel();
                localArrayModel[i].colorr = "rgb("+myRandom.Next(100, 255) + ", " + myRandom.Next(100, 255) + ", " + myRandom.Next(100, 255) + ")";
                localArrayModel[i].strText = arr[i].ToString();
                localArrayModel[i].Visible = "visible";
            }
            localArrayModel[15].Visible = "hidden";

            HttpContext.Session.SetString("AllButtons", JsonConvert.SerializeObject(localArrayModel));
            HttpContext.Session.SetString("IndexEmpty", "15");
            ArrayModel = localArrayModel;
        }
        
        public void OnPostMyClick(string ABCD)
        {
            string str = HttpContext.Session.GetString("AllButtons");

            // Console.WriteLine(str);

            if (str == null)
                return;

            MyModel[] localArrayModel = (MyModel[])(JsonConvert.DeserializeObject<MyModel[]>(str));

            int indexPushed = -1;
            for (int i = 0; i < 16; i++)
            {
                if(localArrayModel[i].strText == ABCD)
                {
                    indexPushed = i;
                    break;
                }
            }

            int indexEmpty = int.Parse(HttpContext.Session.GetString("IndexEmpty"));

 //           Console.WriteLine(indexEmpty  + "  "  + indexPushed);

            string temp = localArrayModel[indexEmpty].strText;
            localArrayModel[indexEmpty].strText = localArrayModel[indexPushed].strText;
            localArrayModel[indexPushed].strText = temp;

            localArrayModel[indexEmpty].Visible = "visible";
            localArrayModel[indexPushed].Visible ="hidden";

            HttpContext.Session.SetString("IndexEmpty", indexPushed.ToString());
            HttpContext.Session.SetString("AllButtons", JsonConvert.SerializeObject(localArrayModel));

            ArrayModel = localArrayModel;

            if (GameOver() == true)
            {
                ViewData["Message"] = "GameOver";

                // Response.Redirect("http://localhost:5165");
                // Response.WriteAsync("<script> setTimeout(function () { if (confirm('Game is over! New Game?'))  window.location.href = 'http://localhost:5222'; }, 1000); </script>");
            }
        }

        bool GameOver()
        {
            string str = HttpContext.Session.GetString("AllButtons");

            // Console.WriteLine(str);

            if (str == null)
                return false;

            MyModel[] localArrayModel = (MyModel[])(JsonConvert.DeserializeObject<MyModel[]>(str));

            if (localArrayModel[0].strText != "1")
                    return false;

            return true;
        }
    }
}