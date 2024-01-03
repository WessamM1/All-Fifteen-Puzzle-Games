var indexEmpty;

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    
    var url = "http://localhost:1337";

    function onDeviceReady() {
        for (var i = 0; i < 15; i++) {
            var myButton = $("<button class='buttonAbsolutePosition'/>");
            myButton.attr('id', i);

            myButton.appendTo($("#myContent"));
        }
        shuffle();
    };

    async function shuffle() {
        var response = await fetch(url + "/shuffle", {
            method: 'POST'
        })
        if (response.ok) {
            var result = await response.text();

            result = JSON.parse(result);
            for (var i = 0; i < 15; i++) {
                var R = result[i].R;
                var G = result[i].G;
                var B = result[i].B;

                var str = "#" + i;

                $(str).css("background-color", "rgb(" + R + "," + G + "," + B + ")");
                $(str).text(result[i].str);
                $(str).attr('tabindex', i);

                var row = Math.floor(i / 4);
                var column = i % 4;

                $(str).css("left", 100 + column * 60);
                $(str).css("top", 100 + row * 60);

                console.log(i);
            }

            $('body').css("background-color", "white");
            indexEmpty = 15;

        } else {
            alert("HTTP-Error: " + response.status);
        }
    }


    $(document).delegate('button', 'click', async function (e) {


        var currTabIndex = e.target.tabIndex;
        var currID = e.target.id;

        var backColor_Pushed = $(this).css("background-color");
        backColor_Pushed = backColor_Pushed.substring(4, backColor_Pushed.length - 1);
        var RGB_parts_pushed = backColor_Pushed.split(",");

        var indexPushed = currTabIndex;
        var TextAndColorPushed = new Object();
        TextAndColorPushed.R = parseInt(RGB_parts_pushed[0]);
        TextAndColorPushed.G = parseInt(RGB_parts_pushed[1]);
        TextAndColorPushed.B = parseInt(RGB_parts_pushed[2]);

        var backColor_Empty = $('body').css("background-color");
        backColor_Empty = backColor_Empty.substring(4, backColor_Empty.length - 1);
        var RGB_parts_Empty = backColor_Empty.split(",");

        var TextAndColorEmpty = new Object();
        TextAndColorEmpty.R = parseInt(RGB_parts_Empty[0]);
        TextAndColorEmpty.G = parseInt(RGB_parts_Empty[1]);
        TextAndColorEmpty.B = parseInt(RGB_parts_Empty[2]);

        var index_TextAndColor_pushed_Empty = new Object();
        index_TextAndColor_pushed_Empty.indexPushed = indexPushed;
        index_TextAndColor_pushed_Empty.TextAndColorPushed = TextAndColorPushed;
        index_TextAndColor_pushed_Empty.indexEmpty = indexEmpty;
        index_TextAndColor_pushed_Empty.TextAndColorEmpty = TextAndColorEmpty;

        var response = await fetch(url + "/myClick", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(index_TextAndColor_pushed_Empty),
        })

        if (response.ok) {
            var resultStr = await response.text();
            var result = JSON.parse(resultStr);

            if (result.str == "false")
                return;
            $('body').css("background-color"), "rgb(" + result.R + "," + result.G + "," + result.B + ")";

            if (result.str == "Left")
                $("#" + currID).animate({ left: '-=60', }, 200);
            if (result.str == "Right")
                $("#" + currID).animate({ left: '+=60', }, 200);
            if (result.str == "Up")
                $("#" + currID).animate({ top: '-=60', }, 200);
            if (result.str == "Down")
                $("#" + currID).animate({ top: '+=60', }, 200);

            $("#" + currID).attr('tabindex', indexEmpty);
            indexEmpty = currTabIndex;

            setTimeout(function () {
                isEnd();
            }, 230);

        } else {
            alert("HTTP-Error: " + response.status);
        }

    });


   async function isEnd(index) {
        var arr_TextAndTabIndex = new Array();
        for (var i = 0; i < 15; i++) {
            arr_TextAndTabIndex[i] = new Object();
            arr_TextAndTabIndex[i].str = $("#" + i).text();
            arr_TextAndTabIndex[i].tabIndex = $("#" + i).attr('tabindex'); /////////////////////
        }

        var response = await fetch(url + "/myCheck", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arr_TextAndTabIndex),
        })
        if (response.ok) {
            var result = await response.text();
            if (result == "true") {
                if (confirm('Game is over!! New Game?'))
                    shuffle();
            } else {
              
            }
        }
    }

})();

