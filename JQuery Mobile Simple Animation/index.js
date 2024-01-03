
var idxEmpty;
var blocked;

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);


    function onDeviceReady() {
        for (var i = 0; i < 15; i++) {
            var myButton = $("<button class='buttonAbsolutePosition'/>");
            myButton.attr('id', i);
            myButton.appendTo($("#myContent"));
        }
        shuffle();

    };


    function shuffle() {
        idxEmpty = 15
        var array = new Array();

        for (var j = 0; j < 15; j++) {
            array[j] = j + 1;
        }
        array[15] = -1;

        for (var ii = 14; ii > 0; ii--) {
            var rnd = Math.floor(Math.random() * ii);
            var tmp = array[ii];
            array[ii] = array[rnd];
            array[rnd] = tmp;
        }

        for (var i = 0; i < 15; i++) {
            var str = "#" + i;

            var R = 150 + Math.floor(Math.random() * 105);
            var G = 150 + Math.floor(Math.random() * 105);
            var B = 150 + Math.floor(Math.random() * 105);
            $(str).css("background-color", "rgb(" + R + "," + G + "," + B + ")");

            $(str).text(array[i].toString());
            $(str).attr('tabindex', i);

            var row = Math.floor(i / 4);
            var column = i % 4;

            $(str).css("left", 50 + column * 60);
            $(str).css("top", 50 + row * 60);
        }
        idxEmpty = 15;
        blocked = false;

    }

    $(document).delegate('button', 'click', function (e) {
        if (blocked == true)
            return;
        else
            blocked = true;

        var currTabIndex = e.target.tabIndex;

        var i1 = currTabIndex % 4;
        var j1 = currTabIndex / 4;
        if (j1 != 0)
            j1 = Math.floor(j1);

        var i2 = idxEmpty % 4;
        var j2 = idxEmpty / 4;
        if (j2 != 0)
            j2 = Math.floor(j2);

        if (Math.abs(i1 - i2) + Math.abs(j1 - j2) == 1) {
            if (i1 > i2)
                $(this).animate({ left: '-=60', }, 200);
            if (i1 < i2)
                $(this).animate({ left: '+=60', }, 200);
            if (j1 > j2)
                $(this).animate({ top: '-=60', }, 200);
            if (j1 < j2)
                $(this).animate({ top: '+=60', }, 200);

            $(this).attr('tabindex', idxEmpty);
            idxEmpty = currTabIndex;

        }
        
        setTimeout(function () {
            blocked = false;
            check();
        }, 250);

    });

    function check() {

        var but1 = $(document.elementFromPoint(50,50 ));
        var but2 = $(document.elementFromPoint(110,50));

        var but1txt = but1.text();
        var but2txt = but2.text();

        if (but1txt == "1" && but2txt == "2") {
            alert("you win");
            return 0;
        }
        return;
    }
})();