using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FifteenWithTime
{
    public partial class Form1 : Form
    {
        private Button[] matrixbuttons = new Button[15];
        private int idxemp;
        Button movbutton;
        private int cntmov = 0;
        private const int size = 70;
        int xx = 0, yy = 0;

        public Form1()
        {
            InitializeComponent();
            for (int i = 0; i < 15; i++)
            {
                matrixbuttons[i] = new Button();
                matrixbuttons[i].Font = new Font("Arial", 24, FontStyle.Bold);
                matrixbuttons[i].Height = size;
                matrixbuttons[i].Width = size;
                matrixbuttons[i].Click += new EventHandler(button_click);
                this.Controls.Add(matrixbuttons[i]);
            }
            shuffle();
        }



        void shuffle()
        {
            int[] arr = new int[15];
            Random rnd = new Random();
            for (int i = 0; i < arr.Length; i++)
                arr[i] = i + 1;
            for (int i = 14; i > 0; i--)
            {
                int r = rnd.Next(i);
                int tmp = arr[i];
                arr[i] = arr[r];
                arr[r] = tmp;
            }
            for (int i = 0; i < 15; i++)
            {
                matrixbuttons[i].Text = arr[i].ToString();
                matrixbuttons[i].Top = 29 + i / 4 * size;
                matrixbuttons[i].Left = 1 + i % 4 * size;
                matrixbuttons[i].Name = i.ToString();
                matrixbuttons[i].BackColor = System.Drawing.Color.FromArgb(rnd.Next());
            }
            idxemp = 15;
        }
        private void button_click(object sender, System.EventArgs e)
        {
            if (cntmov != 0)
                return;

            movbutton = sender as Button;
            int idxpush = int.Parse(movbutton.Name);

            if ((Math.Abs(idxpush - idxemp) == 1) || (Math.Abs(idxpush - idxemp) == 4))
            {
                xx = -((idxpush % 4) - (idxemp % 4)) * 5;
                yy = -((idxpush / 4) - (idxemp / 4)) * 5;
                timer1.Start();
                movbutton.Name = idxemp.ToString();
                idxemp = idxpush;

            }
        }

        private void newGameToolStripMenuItem_Click_1(object sender, EventArgs e)
        {
            shuffle();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            cntmov++;
            movbutton.Location = new Point(movbutton.Location.X + xx, movbutton.Location.Y + yy);
            if (cntmov == 14)
            {
                cntmov = 0;
                timer1.Stop();
                endgame();
            }
        
        }

        private void endgame()
        {
            int i, cnt = 1; ;
            while (cnt <= 2)
            {
                for (i = 0; i < 15; i++)
                {
                    if (matrixbuttons[i].Text==cnt.ToString() && (matrixbuttons[i].Location.X==0 || matrixbuttons[i].Location.X==1)) //problem
                    {
                        cnt++;
                        break;///////////////////
                    }
                }
                if (i == 15)
                    return;
            }
            
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
