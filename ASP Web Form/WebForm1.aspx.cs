using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


//wissam mousa

namespace HW1
{
    public partial class WebForm1 : System.Web.UI.Page
    {

        protected Button[] arrButtons;
        protected Label isgameover;
        protected Button newgame;
        protected int EmptyIdx = -1;
        protected void Page_Load(object sender, EventArgs e)
        {

            arrButtons = new Button[16];
            short i;
            for (i = 0; i < 16; i++)
            {
                arrButtons[i] = new Button();
                arrButtons[i].ID = i.ToString();
                arrButtons[i].Click += new System.EventHandler(AllButtonsClick);
            }
            for (i = 0; i < 4; i++)
            {
                TableRow newRow = new TableRow();
                Table1.Controls.Add(newRow);
                for (int j = 0; j < 4; j++)
                {
                    TableCell newCell = new TableCell();
                    newCell.Controls.Add(arrButtons[i * 4 + j]);
                    newRow.Controls.Add(newCell);
                }
            }
            newgame = new Button();
            newgame.Text = "New Game";
            form1.Controls.Add(newgame);
            newgame.Click += new System.EventHandler(newGameClick);

            isgameover = new Label();
            isgameover.Text = "False";
            form1.Controls.Add(isgameover);

            if (!IsPostBack)
            {
                for (i = 0; i < 16; i++)
                {
                    arrButtons[i].Width = 50;
                    arrButtons[i].Height = 50;
                    arrButtons[i].Font.Size = new FontUnit("X-Large");
                }
                shuffle();
            }

        }

        private void newGameClick(object sender, EventArgs e)
        {
            shuffle();
        }

        private void shuffle()
        {
            int[] arr = new int[15];
            short i;
            for (i = 0; i < 15; i++)
                arr[i] = i + 1;

            Random myRand = new Random();
            for (i = 14; i > 0; i--)
            {
                int R = myRand.Next(i);
                int temp = arr[i];
                arr[i] = arr[R];
                arr[R] = temp;
            }

            for (i = 0; i < 16; i++)
            {
                arrButtons[i].BackColor = System.Drawing.Color.FromArgb(myRand.Next(255), myRand.Next(255), myRand.Next(255));
                if (i != 15)
                {
                    arrButtons[i].Text = arr[i].ToString();
                    arrButtons[i].Visible = true;
                }
                else
                {
                    arrButtons[i].Visible = false;
            
                    
                }
            }
            isgameover.Text = "False";
        }

        private void swap(int indexEmpty, int indexPushed)
        {
            arrButtons[indexEmpty].Visible = true;
            arrButtons[indexEmpty].Text = arrButtons[indexPushed].Text;
            arrButtons[indexEmpty].BackColor = arrButtons[indexPushed].BackColor;
            arrButtons[indexPushed].Visible = false;
        }

        private void AllButtonsClick(object sender, EventArgs e)
        {
            int index = Int32.Parse(((Button)sender).ID);
            int i = index / 4;
            int j = index % 4;

            int EmptyIndex = -1;

            if (i - 1 >= 0 && arrButtons[(i - 1) * 4 + j].Visible == false)
                EmptyIndex = (i - 1) * 4 + j;
            if (i + 1 < 4 && arrButtons[(i + 1) * 4 + j].Visible == false)
                EmptyIndex = (i + 1) * 4 + j;
            if (j - 1 >= 0 && arrButtons[i * 4 + j - 1].Visible == false)
                EmptyIndex = i * 4 + j - 1;
            if (j + 1 < 4 && arrButtons[i * 4 + j + 1].Visible == false)
                EmptyIndex = i * 4 + j + 1;


            //DialogResult dialogResult = MessageBox.Show("Sure", "Some Title", MessageBoxButtons.YesNo);
            //if (dialogResult == DialogResult.Yes)
            //{
            //    //do something
            //}
            //else if (dialogResult == DialogResult.No)
            //{
            //    //do something else
            //}


            if (EmptyIndex != -1)
                {
                swap(EmptyIndex, index);
                if (gameIsOver())
                {
                    isgameover.Text = "You Win! New Game?";
                }
                else
                {
                    isgameover.Text = "False";
                }
            }
        }

        private bool gameIsOver()
        {

            if (arrButtons[0].Text == (1).ToString() && arrButtons[1].Text == (2).ToString() && arrButtons[0].Visible== true && arrButtons[1].Visible == true)
            {
                return true;
            }else
                return false;

        }
    }
}