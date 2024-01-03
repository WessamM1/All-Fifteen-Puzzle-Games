using System.Drawing;

namespace HW_6.Models
{
    [Serializable]
    public class StepNow
    {
        public string ToMove { get; set; } = "";
        public string coloravg { get; set; } = "";
        public StepNow()
        {
            ToMove = "";
            coloravg = "";
        }
        public StepNow(string s, string c)
        {

            ToMove = s;
            coloravg = c;
        }
    }
}

