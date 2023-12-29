using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace fifteen_windows_game
{
    public partial class Form1 : Form
    {
        private Button[,] matrixbuttons = new Button[4, 4];
        private int idxrowemp, idxcolemp;
        public Form1()
        {
            InitializeComponent();
            int size = 70;
            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    matrixbuttons[i, j] = new Button();
                    matrixbuttons[i, j].Width = size;
                    matrixbuttons[i,j].Height = size;
                    matrixbuttons[i, j].Left = 1 + j % 4 * size;
                    matrixbuttons[i, j].Top = 32 + i * size;
                    matrixbuttons[i, j].Name = (i * 4 + j).ToString();
                    matrixbuttons[i, j].Font = new Font("Old English", 24, FontStyle.Bold);
                    matrixbuttons[i, j].Click += new EventHandler(button_click);
                    this.Controls.Add(matrixbuttons[i, j]);
                }
            }
            shuffle();
        }

        private void newGameToolStripMenuItem_Click(object sender, EventArgs e)
        {
            shuffle();
        }



        void shuffle()
        {
            int[] arr = new int[15];
            int k = 0;
            for (int i = 0; i < arr.Length; i++)
                arr[i] = i + 1;
            Random rnd = new Random();
            for (int i = 14; i > 0; i--) 
            {
                int r=rnd.Next(i);
                int tmp=arr[i];
                arr[i]=arr[r];
                arr[r]=tmp;
            }
            for (int i = 0;i < 4; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    matrixbuttons[i, j].BackColor= System.Drawing.Color.FromArgb(rnd.Next());
                    if (k != 15)
                    {
                        matrixbuttons[i,j].Text=arr[k].ToString();
                        matrixbuttons[i,j].Visible=true;
                        k++;
                    }
                    else
                    {
                        matrixbuttons[i,j].Visible = false;
                        idxcolemp = 3;
                        idxrowemp = 3;
                    }
                }
            }
        }
        private void button_click(object sender,System.EventArgs e)
        {
            Button tmpB =sender as Button;
            int idxrow = int.Parse(tmpB.Name) / 4;
            int idxcol = int.Parse(tmpB.Name) % 4;

            if (Math.Abs(idxrow - idxrowemp) + Math.Abs(idxcol - idxcolemp)==1)
            {
                matrixbuttons[idxrowemp,idxcolemp].Text=matrixbuttons[idxrow,idxcol].Text;
                matrixbuttons[idxrowemp, idxcolemp].BackColor = matrixbuttons[idxrow, idxcol].BackColor;
              
                matrixbuttons[idxrowemp,idxcolemp].Visible=true;
                matrixbuttons[idxrow,idxcol].Visible=false;

                idxrowemp = idxrow;
                idxcolemp = idxcol;
                endgame();
            }
        }

        private void endgame()
        {
            int i;
            for (i = 0; i < 2; i++)
            {
                if (matrixbuttons[i / 4, i % 4].Text != (i + 1).ToString())
                    break;
            }
            if (i != 2)
                return;

            DialogResult result = MessageBox.Show("New Game?<3", "Game Over!-_-", MessageBoxButtons.YesNo);
            if (result == DialogResult.Yes)
            {
                shuffle();
            }
            else
            {
                this.Close();
            }
        }
    }
}
