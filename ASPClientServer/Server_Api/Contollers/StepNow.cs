using System.Drawing;

namespace Server_Api.Contollers
{
    public class StepNow
    {
        public string ToMove { get; set; } = "";
        public string color_avg_back { get; set; } = "";
        public StepNow()
        {
            ToMove = "";
            color_avg_back = "";
        }
        public StepNow(string s, string c)
        {

            this.ToMove = s;
            this.color_avg_back = c;
        }
    }
}

