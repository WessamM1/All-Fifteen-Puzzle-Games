using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using Microsoft.AspNetCore.Http;

namespace Server_Api.Contollers
{
    [Route("api/[controller]/{action}")]
    [ApiController]
    public class MyController : ControllerBase
    {
        //http://localhost:5206/api/my/load
        [HttpGet]
        public async Task<Text_Color[]> Load()
        {//GET
            int i, j = 0;
            int cnt = 0;
            int[] arr = new int[15];
            Random rnd = new Random();
            for (i = 0; i < 15; i++)
            {
                arr[i] = i + 1;
            }
            for (i = 14; i > 0; i--)
            {
                int R = rnd.Next(i);
                int temp = arr[i];
                arr[i] = arr[R];
                arr[R] = temp;
            }

            Text_Color[] TextColorArr = await Task<Text_Color[]>.Run(() => new Text_Color[15]);
            for (i = 0; i < 4; i++)
            {
                for (j = 0; j < 4; j++)
                {
                    if (cnt != 15)
                    {
                        Color col = Color.FromArgb(rnd.Next(100, 255), rnd.Next(100, 255), rnd.Next(100, 255));
                        string c = await Task<string>.Run(() => HexConverter(col));
                        string number = arr[cnt].ToString();
                        TextColorArr[i * 4 + j] = await Task<Text_Color>.Run(() => new Text_Color(number, c));

                        cnt++;
                    }
                }
            }
            return TextColorArr;
        }

        private static String HexConverter(Color c)
        {
            return "#" + c.R.ToString("X2") + c.G.ToString("X2") + c.B.ToString("X2");
        }

        [HttpPost]
        public async Task<StepNow> AsyncNextStep(MakeStep Ts)
        {
            Color c = await Task<Color>.Run(() => MakeStep.ColorAvg(Ts));
            string ColStep = await Task<string>.Run(() => HexConverter(c));
            string actionStep = await Task<string>.Run(() => MakeStep.NextMove(Ts));
            StepNow ns = await Task<StepNow>.Run(() => new StepNow(actionStep, ColStep));

            return ns;

        }

        [HttpPost]
        public async Task<string> AsyncIsEnd(string[] stra)
        {
            string str = stra[0]+","+stra[1];
            string resultStr;
            string[] strArrTmp = str.Split(',');
            string s1 = strArrTmp[0].Replace("\"", "");
            string s2 = strArrTmp[1].Replace("\"", "");

            //string strArr_bcSl = strArr_q.Replace("\\", "");

            if ((s1).Equals("1") && (s2).Equals("2"))
            {
                resultStr = "TRUE";
            }
            else
            {
                resultStr = "FALSE";
            }

            return resultStr;

           
        }

       

    }
}
