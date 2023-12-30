using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.DynamicData;

namespace fifteenServer
{
    [Serializable]
    public class NextClick
    {
        public int pushedidxX;
        public int pushedidxY;
        public int emptyidxX;
        public int emptyidxY;
        public string buttcolor;
        public string backcolor;

        public static string WhereToGo(NextClick nc)
        {
            string cmd = "";

            if ((Math.Abs(nc.pushedidxX - nc.emptyidxX)) + Math.Abs(nc.pushedidxY - nc.emptyidxY) == 1)
            {
                if (nc.pushedidxX == nc.emptyidxX && nc.pushedidxY + 1 == nc.emptyidxY)
                {
                    cmd = "Right";
                }
                else if (nc.pushedidxX == nc.emptyidxX && nc.pushedidxY == nc.emptyidxY + 1)
                {
                    cmd = "Left";
                }
                else if (nc.pushedidxX + 1 == nc.emptyidxX && nc.pushedidxY == nc.emptyidxY)
                {
                    cmd = "Down";
                }
                else if (nc.pushedidxX == nc.emptyidxX + 1 && nc.pushedidxY == nc.emptyidxY)
                {
                    cmd = "Up";
                }
            }
            return cmd;
        }

        public static Color Getavg(NextClick idxesClicked)
        {
            Color result = new Color();
            //if (idxesClicked != null)
            //{
            //    return result;
            //}
            //string[] ForButton = idxesClicked.buttcolor.Split();
            
            //string red = idxesClicked.backcolor + idxesClicked.buttcolor/2;
            //string green = idxesClicked.backcolor + idxesClicked.buttcolor/2;
            //string blue = idxesClicked.backcolor + idxesClicked.buttcolor/2;

            //result = Color.FromArgb(int.Parse(red), int.Parse(green),int.Parse(blue));

            string input = idxesClicked.buttcolor;
            string[] parts = input.Split(new char[] { '(', ',', ')' }, StringSplitOptions.RemoveEmptyEntries);
            int r = int.Parse(parts[1]);
            int g = int.Parse(parts[2]);
            int b = int.Parse(parts[3]);

            string input1 = idxesClicked.backcolor;
            string[] parts1 = input1.Split(new char[] { '(', ',', ')' }, StringSplitOptions.RemoveEmptyEntries);
            int r1 = int.Parse(parts1[1]);
            int g1 = int.Parse(parts1[2]);
            int b1 = int.Parse(parts1[3]);

            int resultR = (r+r1)/2;
            int resultG= (g+g1)/2;
            int resultB= (b1+b1)/2;

            result = Color.FromArgb( resultR, resultG, resultB);
            return result;
        }

        
    }
}