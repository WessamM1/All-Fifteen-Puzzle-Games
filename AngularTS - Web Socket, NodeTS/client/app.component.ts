import { Component, ElementRef, ViewChild } from '@angular/core';
import { WebSocketService } from './websocket-observable-service';


@Component({
  selector: 'my-app',
  providers: [WebSocketService],
  template: `
  <div>
     <div *ngFor="let count of arrNew(15)">
     <button id="{{count}}" [ngStyle]="{'top': (divideFunction(count) * 60)+'px', 'left': (count % 4) * 60 +'px'}" class="buttonAbsolutePosition" (click)="myClick($event)">{{count}}</button>
  <div>

`,
  styleUrls: ['app.component.css']
})

export class AppComponent {

    indexempty: number;
    ButtNow: HTMLInputElement;

  constructor(private wsService: WebSocketService) {
    setTimeout(() => {
      this.shuffle();
    }, 50)
    this.indexempty = 15;
    this.ButtNow = <HTMLInputElement>document.elementFromPoint(0, 0);
    this.wsService.createObservableSocket("ws://localhost:5000")
      .subscribe(
        data => {

          let temp: any = JSON.parse(data);

              if (temp.action == "shuffle") {
                  for (var i = 0; i < 15; i++) {
                      let myButton: HTMLInputElement = <HTMLInputElement>document.getElementById(i + "");
                      var R = temp.arrTextAndColor[i].R;
                      var G = temp.arrTextAndColor[i].G;
                      var B = temp.arrTextAndColor[i].B;

                      myButton.style.top = (this.divideFunction(i)) * 60 + 'px';
                      myButton.style.left = (i % 4) * 60 + 'px';
                      myButton.innerHTML = temp.arrTextAndColor[i].str;
                      myButton.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
                      myButton.tabIndex = i;
                  }
                  document.body.style.backgroundColor = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
                  this.indexempty = 15;

              }
              if (temp.action == "whereTo") {
                  if (temp.MoveOrNot == "Yes") {
                      let a: any = this.indexempty;
                      this.ButtNow = <HTMLInputElement>document.elementFromPoint((temp.indexPushed % 4) * 60, (this.divideFunction(temp.indexPushed)) * 60);
                      this.indexempty = this.ButtNow.tabIndex;
                      this.ButtNow.tabIndex = a;
                      this.ButtNow.style.top = (this.divideFunction(a)) * 60 + 'px';
                      this.ButtNow.style.left = (a % 4) * 60 + 'px';
                      document.body.style.backgroundColor = "rgb(" + temp.arr_backcolor[0] + "," + temp.arr_backcolor[1] + "," + temp.arr_backcolor[2] + ")";

                      setTimeout(() => {
                          this.GameOver();
                      }, 50)
                  }

              }


              if (temp.action == "gameOver") {
                  if (temp.IsOver == "Yes") {
                      if (confirm("Are you want to play again ?") == true) {
                          this.shuffle();
                      }
                  }
                  
              }
            
        },
        err => alert(err),
        () => alert('The observable stream is complete')
    );
  }

  GameOver() {
    var button1 = <HTMLInputElement>(document.elementFromPoint(0, 0));
    var button2 = <HTMLInputElement>(document.elementFromPoint(60, 0));
    var b1 = button1.innerHTML;
    var b2 = button2.innerHTML;

    let ButtonsCheck = {
      b1: b1,
      b2: b2,
        action: "gameOver"
    }

    this.wsService.sendMessage(ButtonsCheck);


  }

  shuffle() {
    let messagesent = {
      action: "shuffle"
    }
    this.wsService.sendMessage(messagesent);
  }

  myClick($event) {
    let buttClicked = $event.target;
    this.ButtNow = buttClicked;
    var currTabIndex = buttClicked.tabIndex;

    var backColorPushed = buttClicked.style.backgroundColor;
    backColorPushed = backColorPushed.substring(4, backColorPushed.length - 1);
    var RGB_parts_Pushed = backColorPushed.split(",");

    var indexPushed = currTabIndex;
    var TextAndColorPushed = {
      R: parseInt(RGB_parts_Pushed[0]),
      G: parseInt(RGB_parts_Pushed[1]),
      B: parseInt(RGB_parts_Pushed[2])
    }



    var BackColorEmp = this.getBackgroundColor();
    var RGBEmp = BackColorEmp.split(",");

    var TextAndColorEmpty = {
      R: parseInt(RGBEmp[0]),
      G: parseInt(RGBEmp[1]),
      B: parseInt(RGBEmp[2])
    }

      let index_TextAndColorPushEmpty = {
      backColorPushed: backColorPushed,
      backColor_Empty: BackColorEmp,
      indexPushed: indexPushed,
      TextAndColorPushed: TextAndColorPushed,
      indexEmpty: this.indexempty,
      TextAndColorEmpty: TextAndColorEmpty,
      action: "whereTo"
    }
    this.wsService.sendMessage(index_TextAndColorPushEmpty);

    }

    divideFunction(num: number) {

        return Math.floor(num / 4);
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

  

    arrNew(num: number) {

        var arr: number[] = [];
        for (let i = 0; i < num; i++) {
          arr.push(i);
        }
        return arr;
    }

}
