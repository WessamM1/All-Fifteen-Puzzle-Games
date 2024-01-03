using System.Drawing;

namespace Server_Api.Contollers
{
    public class MakeStep
    {
        public int RowEmpty { get; set; } = 0;
        public int ColEmpty { get; set; } = 0;
        public int Row { get; set; } = 0;
        public int Col { get; set; } = 0;
        public string ClickColor { get; set; } = "";
        public string backCol { get; set; } = "";

        public static Color ColorAvg(MakeStep mks)
        {
            string clickCol_tmp = mks.ClickColor.Substring(4, 13).Replace(" ", "");
            string[] clickCol_arr = clickCol_tmp.Split(',');

            string bacCol_tmp = mks.backCol.Substring(4, 13).Replace(" ", "");
            string[] bacCol_arr = bacCol_tmp.Split(',');
            int R = (int.Parse(clickCol_arr[0]) + int.Parse(bacCol_arr[0])) / 2;
            int G = (int.Parse(clickCol_arr[1]) + int.Parse(bacCol_arr[1])) / 2;
            int B = (int.Parse(clickCol_arr[2]) + int.Parse(bacCol_arr[2])) / 2;

            Color colAvg = new Color();
            colAvg = Color.FromArgb(R, G, B);
            return colAvg;
        }

        public static string NextMove(MakeStep mks)
        {
            if ((Math.Abs(mks.Row - mks.RowEmpty) + Math.Abs(mks.Col - mks.ColEmpty)) == 1)
            {
                if (mks.Col == mks.ColEmpty && (mks.Row == (mks.RowEmpty + 1)))
                {
                    return "UP";
                }
                else if (mks.Col == mks.ColEmpty && ((mks.Row + 1) == mks.RowEmpty))
                {
                    return "DOWN";
                }
                else if (mks.Row == mks.RowEmpty && ((mks.Col + 1) == mks.ColEmpty))
                {
                    return "RIGHT";
                }
                else if (mks.Row == mks.RowEmpty && (mks.Col == (mks.ColEmpty + 1)))
                {
                    return "LEFT";
                }
            }
            return null;

        }

    }
}
