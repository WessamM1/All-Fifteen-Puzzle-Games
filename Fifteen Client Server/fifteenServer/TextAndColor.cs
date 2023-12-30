using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace fifteenServer
{
    [Serializable]
    public class TextAndColor
    {
        public string numbutton;
        public string R;
        public string G;
        public string B;

        public TextAndColor(string s, Color col)
        {
            this.numbutton = s;
            R = col.R.ToString();
            G = col.G.ToString();
            B = col.B.ToString();
        }
    }
}