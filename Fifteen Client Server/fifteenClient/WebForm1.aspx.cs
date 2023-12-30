using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace fifteenClient
{
    public partial class WebForm1 : System.Web.UI.Page
    {
       
            Button[] arrButtons;
        protected void Page_Load(object sender, EventArgs e)
        {
            arrButtons = new Button[15];
            for (short i = 0; i < 15; i++)
            {
                arrButtons[i] = new Button();
                arrButtons[i].ID = i.ToString();
                arrButtons[i].Attributes.Add("onclick", "javascript:OnClick(" + i.ToString() + ");return false;");

                arrButtons[i].Width = 50;
                arrButtons[i].Height = 50;
                arrButtons[i].Font.Size = new FontUnit("X-Large");
                arrButtons[i].Style["Position"] = "Absolute";
                
                form1.Controls.Add(arrButtons[i]);
            }
            ClientScript.RegisterStartupScript(typeof(Page), "Load", "<script>javascript:myLoad();</script>");
        }
    }
}
