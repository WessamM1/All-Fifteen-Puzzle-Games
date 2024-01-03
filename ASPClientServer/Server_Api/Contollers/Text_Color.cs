using System.Drawing;

namespace Server_Api.Contollers
{
    public class Text_Color
    {
        public string num { get; set; } ="";
        public string color_ { get; set; } = "";


        public Text_Color(string s, string c)
        {

            this.num = s;
            this.color_ = c;
        }

    }
}
