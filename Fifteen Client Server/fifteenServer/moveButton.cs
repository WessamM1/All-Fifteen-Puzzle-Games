using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace fifteenServer
{
    [Serializable]
    public class moveButton
    {
        public string numbutton;
        public Color color;
      
        public moveButton(string s, Color col)
        {

            this.numbutton = s;
            this.color = col;
            
        }
    }
}