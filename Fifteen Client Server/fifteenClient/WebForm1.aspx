<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="fifteenClient.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <script language="javascript">

                var indexrowEmpty;
                var indexrowPushed;
                var indexcolEmpty;
                var indexcolPushed;

                var button_Clicked;
                var blocked;

                var myJsonObject;
               
                var intervalID;
                var counter = 0;


                async function myLoad() {
                    indexrowEmpty = 3;
                    indexcolEmpty = 3;
                    var url = "http://localhost:59774/IISHandler2.ashx?cmd=Load";

                    var response = await fetch(url, {

                        method: 'GET'
                    });

                    if (response.ok) {

                        var myJSON_Text = await response.text();
                        
                        myJsonObject = JSON.parse(myJSON_Text);
                        
                        for (var i = 0; i < 15; i++) {
                            var tempButton = document.getElementById(i);
                            tempButton.tabIndex = i;
                            tempButton.value = myJsonObject[i].numbutton;

                            var row = Math.floor(i / 4);
                            var colmn = i % 4;

                            tempButton.style.left = colmn * 50 + "px";
                            tempButton.style.top = row * 50 + "px";

                            tempButton.style.backgroundColor = 'rgb(' + myJsonObject[i].R + ',' + myJsonObject[i].G + ',' + myJsonObject[i].B + ')';
                            
                        }
                        blocked = false;
                        document.body.style.backgroundColor = 'rgb(255, 255, 255)';
                    } 
                       
                    

                }

                async function OnClick(index) {
                    
                    if (blocked == true) {                 
                        return;
                    }
                    else
                        blocked = true;
                    
                    button_Clicked = document.getElementById(index);
                    indexrowPushed = Math.floor(button_Clicked.tabIndex / 4);
                    indexcolPushed = button_Clicked.tabIndex % 4;
                   
                    myJSON_Object1 = new Object();

                    myJSON_Object1.emptyidxX = indexrowEmpty;
                    myJSON_Object1.emptyidxY = indexcolEmpty;
                    myJSON_Object1.pushedidxX = indexrowPushed;
                    myJSON_Object1.pushedidxY = indexcolPushed;
                    
                    myJSON_Object1.buttcolor = button_Clicked.style.backgroundColor;
                    myJSON_Object1.backcolor = document.body.style.backgroundColor;
                    var myJsonString = JSON.stringify(myJSON_Object1);
                   
                    var url = "http://localhost:59774/IISHandler2.ashx?cmd=NextStep";

                    var response = await fetch(url, {

                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: myJsonString
                    });
                   
                    if (response.ok) {
                        var myjSON_Text = await response.text();
                        
                        
                        var myJsonObject_Temp = JSON.parse(myjSON_Text);
                       
                        
                        if (myJsonObject_Temp == "") {
                            blocked = false;
                            return;
                        }

                       
                        if (myJsonObject_Temp.numbutton == "Left")
                            intervalID = setInterval(motionLeft, 10);
                        if (myJsonObject_Temp.numbutton == "Right")
                            intervalID = setInterval(motionRight, 10);
                        if (myJsonObject_Temp.numbutton == "Up")
                            intervalID = setInterval(motionUp, 10);
                        if (myJsonObject_Temp.numbutton == "Down")
                            intervalID = setInterval(motionDown, 10);
                        
                         
                        
                        myJSON_Object1.emptyidxX = myJSON_Object1.pushedidxX;
                        myJSON_Object1.emptyidxY = myJSON_Object1.pushedidxY;

                        myJSON_Object1.pushedidxX = myJSON_Object1.emptyidxX;
                        myJSON_Object1.pushedidxY = myJSON_Object1.emptyidxY;



                        var color_R = myJsonObject_Temp.color.R;
                        var color_G = myJsonObject_Temp.color.G;
                        var color_B = myJsonObject_Temp.color.B;

                        document.body.style.backgroundColor = 'rgb(' + myJsonObject_Temp.color.R + ',' + myJsonObject_Temp.color.G + ',' + myJsonObject_Temp.color.B + ')';
                        document.body.style.backgroundColor = 'rgb(' + color_R.toString() + ',' + color_G.toString() + ',' + color_B.toString() + ')';

                        button_Clicked.tabIndex = indexrowEmpty * 4 + indexcolEmpty;
                        
                        
                    } else {
                        alert("not working");
                    }
                }
                
                var counter = 0;
                move_counter = 50
                function motionRight() {
                    var currLeft = button_Clicked.style.left.replace("px", "");
                    button_Clicked.style.left = parseInt(currLeft) + 1 + "px";
                    counter++;
                    if (counter == move_counter) {  
                        counter = 0;
                        clearInterval(intervalID);
                        indexrowEmpty = indexrowPushed;
                        indexcolEmpty = indexcolPushed; 
                        blocked = false;
                        isGameOver();
                    }
                }


                var counter = 0;
                move_counter = 50;
                function motionLeft() {
                    var currLeft = button_Clicked.style.left.replace("px", "");
                    button_Clicked.style.left = parseInt(currLeft) - 1 + "px";
                    counter++;
                    if (counter == move_counter) {
                        counter = 0;
                        clearInterval(intervalID);
                        indexrowEmpty = indexrowPushed;
                        indexcolEmpty = indexcolPushed;
                        blocked = false;
                        isGameOver();
                    }
                }
                function motionDown() {
                    var currTop = button_Clicked.style.top.replace("px", "");
                    button_Clicked.style.top = parseInt(currTop) + 1 + "px";
                    counter++;
                    if (counter == move_counter) {
                        counter = 0;
                        clearInterval(intervalID);
                        indexrowEmpty = indexrowPushed;
                        indexcolEmpty = indexcolPushed;
                        blocked = false;
                        isGameOver();

                    }
                }

                function motionUp() {
                    var currTop = button_Clicked.style.top.replace("px", "");
                    button_Clicked.style.top = parseInt(currTop) - 1 + "px";
                    counter++;
                    if (counter == move_counter) {
                        counter = 0;
                        clearInterval(intervalID);
                        indexrowEmpty = indexrowPushed;
                        indexcolEmpty = indexcolPushed;
                        blocked = false;
                         isGameOver();
                    }
                }

                async function isGameOver() {
                    button1 = document.elementFromPoint(0, 0);
                    button2 = document.elementFromPoint(50, 0);

                    JsonObj = new Object();
                    
                    JsonObj = button1.value + "," + button2.value;

                    var myJsonString = JSON.stringify(JsonObj);
                    var url = "http://localhost:59774/IISHandler2.ashx?cmd=isGameOver";

                    var response = await fetch(url, {

                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: myJsonString
                    });

                    if (response.ok) {
                        var Jsontxt = await response.text();
                        if (Jsontxt == "True") {
                            var finish = confirm("You Won!! do you want to Play again ??");
                            if (finish)
                                myLoad();
                            else
                            window.close();
                        }

                    }
                }

            </script>
        </div>
    </form>
</body>
</html>
