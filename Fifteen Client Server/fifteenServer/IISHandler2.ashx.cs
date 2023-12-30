using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI.WebControls;

namespace fifteenServer
{
    // http://localhost:59774/IISHandler2.ashx?cmd=Load
    /// <summary>
    /// Summary description for IISHandler2
    /// </summary>
    public class IISHandler2 : HttpTaskAsyncHandler
    {
        
        public override async Task ProcessRequestAsync(HttpContext context)
        {
            string command = context.Request.QueryString["cmd"];
            JavaScriptSerializer myjavaScriptSerializer = new JavaScriptSerializer();
            string jsonString = new StreamReader(context.Request.InputStream).ReadToEnd();
            if (command == "Load")
                await Load(context);
            else
            {
                
                if(command == "NextStep")
                {
                    NextClick idxesClicked = (NextClick)myjavaScriptSerializer.Deserialize(jsonString, typeof(NextClick));//rgb(119, 228, 174)
                    await AsyncNextStep(context,idxesClicked);
                }
                if(command == "isGameOver")
                {
                 
                    await AsyncIsGameOver(context, jsonString);
                }
            }
        }

        
        

        public static async Task Load(HttpContext context)//GET
        {
            
            int[] arr = new int[15];
            int i, j, k = 0;
            for (i = 0; i < 15; i++)
            {
                arr[i] = i + 1;
            }
            Random myRand = new Random();
            for (i = 14; i > 0; i--)
            {
                int R = myRand.Next(i);
                int temp = arr[i];
                arr[i] = arr[R];
                arr[R] = temp;
            }
            TextAndColor[] TACarr = new TextAndColor[15];
            
            for (i = 0; i < 4; i++)
            {
                for (j = 0; j < 4; j++)
                {
                    if (k != 15)
                    {
                        Color color = Color.FromArgb(myRand.Next(100, 255), myRand.Next(100, 255), myRand.Next(100, 255));
                        string number = arr[k].ToString();
                        TACarr[i * 4 + j] = await Task<TextAndColor>.Run(() => new TextAndColor(number,color));
                        k++;
                    }
                }
            }
            JavaScriptSerializer myJavaScriptSerializer = new JavaScriptSerializer();
            string resultStr = myJavaScriptSerializer.Serialize(TACarr);
            context.Response.Write(resultStr);
        }
        public async Task AsyncNextStep(HttpContext context, NextClick idxesClicked)
        {
            string cmd = await Task.Run(() => NextClick.WhereToGo(idxesClicked));
           
            if (cmd == "")
            {
                return;
            }
            Color col = await Task.Run(() => NextClick.Getavg(idxesClicked));
            if (col == null) { return; }
            moveButton resultbutton = await Task.Run(() => new moveButton(cmd, col));

            JavaScriptSerializer myJavaScriptSerializer = new JavaScriptSerializer();
            string resultStr = myJavaScriptSerializer.Serialize(resultbutton);
            context.Response.Write(resultStr);
        }

        public static async Task AsyncIsGameOver(HttpContext context, string All)
        {

            
            string[] arrAll = All.Split(',');
            string str0 = arrAll[0].Replace("\"", "");
            string str1 = arrAll[1].Replace("\"", "");

            
            if (str0.Equals("1") && str1.Equals("2"))
            {
                context.Response.Write("True");
            }
            else
            {
                context.Response.Write("False");
            }
        }
    }
}