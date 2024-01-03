using System.Drawing;

namespace HW_6.Models
{
    [Serializable]
    public class myModel
    {
        public string num { get; set; } = "";

        public string color_ { get; set; } = "";

        public myModel()
        {

        }
        public myModel(string num,string color_)
        {
            this.color_ = color_;
            this.num = num;
        }

       
        


    }
}
