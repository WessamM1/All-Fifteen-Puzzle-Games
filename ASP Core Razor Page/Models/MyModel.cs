using Microsoft.AspNetCore.Mvc;
using System.Drawing;

namespace Commom_ASP_Core_Razor.Models
{
    public class MyModel
    {
        public string strText { get; set; } = "";
        public string Visible { get; set; } = "visible";
        public string colorr { get; set; } = "";

        public MyModel() {
            
        }
        public MyModel(string s = "", string  V = "visible", string c = "")
        {
            strText = s;
            Visible = V;
            colorr = c;

        }
    }
}