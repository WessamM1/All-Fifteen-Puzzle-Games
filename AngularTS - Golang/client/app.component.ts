import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'my-app',
    template: `
        <div>
           <div *ngFor="let count of createArr(15)">
           <button id="{{count}}" [ngStyle]="{'top': (divideFunction(count) * 60)+'px', 'left': (count % 4) * 60 +'px'}" class="buttonAbsolutePosition" (click)="MyClick($event)">{{count}}</button>
        <div>
    `,
    styleUrls: ['app.component.css'],
    providers: [HttpService]
})

export class AppComponent {
    indexEmpty: number;
    state: string = '';

    constructor(private httpService: HttpService) {
        this.indexEmpty = 15;
        setTimeout(() => {
            this.Shuffle();
        }, 50)
    }

    Shuffle() {
        let jsonString: any;
        this.httpService.shuffle().subscribe(
            (response: any) => {
                jsonString = JSON.stringify(response);
                interface TextAndColorArr {
                    Str: string;
                    R: number;
                    G: number;
                    B: number;
                }

                interface TextAndColor {
                    [index: number]: TextAndColorArr;
                    length: number;
                }
                const inputString = jsonString
                const parsedArray: TextAndColor = JSON.parse(inputString);

                for (var i = 0; i < 15; i++) {
                    let myButton: HTMLInputElement = <HTMLInputElement>document.getElementById(i + "");
                    var R = parsedArray[i].R;
                    var G = parsedArray[i].G;
                    var B = parsedArray[i].B;

                    myButton.style.top = (this.divideFunction(i)) * 60 + 'px';
                    myButton.style.left = (i % 4) * 60 + 'px';
                    myButton.innerHTML = parsedArray[i].Str;
                    myButton.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
                    myButton.tabIndex = i;
                }
                document.body.style.backgroundColor = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
                this.indexEmpty = 15;
            },
            (error: any) => {
                console.log('shuffle error:', error);
            }
        );

    }

    MyClick($event) {
        let buttClicked = $event.target;   
        var currTabIndex = buttClicked.tabIndex;
        var backColor_Pushed = buttClicked.style.backgroundColor;
        backColor_Pushed = backColor_Pushed.substring(4, backColor_Pushed.length - 1);
        var RGB_parts_Pushed = backColor_Pushed.split(",");
        var indexPushed = currTabIndex;
        var TextAndColorPushed = {
            R: parseInt(RGB_parts_Pushed[0]),
            G: parseInt(RGB_parts_Pushed[1]),
            B: parseInt(RGB_parts_Pushed[2])
        }

        var backColor_Empty = this.getBackgroundColor();
        var RGB_parts_Empty = backColor_Empty.split(",");
        var TextAndColorEmpty = {
            R: parseInt(RGB_parts_Empty[0]),
            G: parseInt(RGB_parts_Empty[1]),
            B: parseInt(RGB_parts_Empty[2])
        }

        let index_TextAndColorPushEmpty = {
            backColor_Pushed: backColor_Pushed,
            backColor_Empty: backColor_Empty,
            indexPushed: indexPushed,
            TextAndColorPushed: TextAndColorPushed,
            indexEmpty: this.indexEmpty,
            TextAndColorEmpty: TextAndColorEmpty,
        }

        let payload = JSON.stringify(index_TextAndColorPushEmpty);
        let backColor_EmptyArr = backColor_Empty.split(',');
        let backColor_Empty_Arr = backColor_EmptyArr.map(Number);
        let trimmedString = backColor_Pushed.replace(/\s/g, '');
        let backColor_PushedArr = trimmedString.split(',');
        let backColor_Pushed_Arr = backColor_PushedArr.map(Number);
        let AverageBackgroundColorArr = this.calculateAverageBackgroundColor(backColor_Pushed_Arr, backColor_Empty_Arr)

        this.httpService.myclick(payload).subscribe(
            (response: any) => {
                var stringify = JSON.stringify(response);
                let Moveto = stringify.replace(/"/g, '');
                if (Moveto == "nothing")
                    return;
                let newX: number;
                let newY: number;
                var ButtMove = $event.target;
                ButtMove.tabIndex = this.indexEmpty;
                this.indexEmpty = currTabIndex;

                if(Moveto== "Left"){
                    ButtMove.style['-webkit-animation-name'] = "Left";
                    newX = ButtMove.offsetLeft - 60;
                    newY = ButtMove.offsetTop;              
                }
                if(Moveto== "Right"){
                    ButtMove.style['-webkit-animation-name'] = "Right";
                    newX = ButtMove.offsetLeft + 60;
                    newY = ButtMove.offsetTop;
                }
                if(Moveto== "Up"){
                    ButtMove.style['-webkit-animation-name'] = "Up";
                    newX = ButtMove.offsetLeft;
                    newY = ButtMove.offsetTop - 60;
                }
                if(Moveto== "Down"){
                    ButtMove.style['-webkit-animation-name'] = "Down";
                    newX = ButtMove.offsetLeft;
                    newY = ButtMove.offsetTop + 60;
                }
                ButtMove.style['-webkit-animation-play-state'] = "running";

                setTimeout(() => {
                    ButtMove.style.left = newX + "px";
                    ButtMove.style.top = newY + "px";
                    ButtMove.style['-webkit-animation-name'] = "none";
                    ButtMove.style['-webkit-animation-play-state'] = "none";
                    this.IsEnd();
                    document.body.style.backgroundColor = "rgb(" + AverageBackgroundColorArr[0] + "," + AverageBackgroundColorArr[1] + "," + AverageBackgroundColorArr[2] + ")";
                }, 400);
            },
            (error: any) => {
                console.log('MyClick error:', error);
            }
        );
    }

    IsEnd() {
        let button1: HTMLInputElement = <HTMLInputElement>document.elementFromPoint(0, 0);
        let button2: HTMLInputElement = <HTMLInputElement>document.elementFromPoint(60, 0);
        var but1 = button1.innerHTML;
        var but2 = button2.innerHTML;
        if (but1 == "1" && but2 == "2") {       
            if (confirm("You Win!!! Play again ?? ")) {
                this.Shuffle();
            } else {
            }
        }
    }

    getBackgroundColor(): string {
        const body = document.body;
        const computedStyle = getComputedStyle(body);
        const backgroundColor = computedStyle.backgroundColor;
        let ret: string = backgroundColor.replace("rgba(", "");
        ret = ret.replace(")", "");
        ret = ret.replace("rgb(", "");
        let arrtemp: Array<string> = ret.split(", ")
        return arrtemp[0] + "," + arrtemp[1] + "," + arrtemp[2]
    }

    createArr(num: number) {
        let myArray: number[] = [];
        for (let i = 0; i < num; i++) {
            myArray.push(i);
        }
        return myArray;
    }

    divideFunction(num: number): number {
        return Math.floor(num / 4);
    }

    calculateAverageBackgroundColor(arr1: number[], arr2: number[]): number[] {
        const result: number[] = [];
        result[0] = (arr1[0] + arr2[0]) / 2;
        result[1] = (arr1[1] + arr2[1]) / 2;
        result[2] = (arr1[2] + arr2[2]) / 2;
        return result;
    }
}
