import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div>
           <div *ngFor="let count of createArr(15)">
           <button id="{{count}}" [ngStyle]="{'top': (divideFunction(count) * 60)+'px', 'left': (count % 4) * 60 +'px'}" class="buttonAbsolutePosition" (click)="myClick($event)">{{count}}</button>
        <div>

    `,
    styleUrls: ['app.component.css']
})
export class AppComponent {
    indexEmpty: number;
	
    state: string = '';

    constructor() {
        setTimeout(() => {
            this.shuffle();
        }, 50)
    }

    createArr(num:number) {
        var myArray: number[] = [];
        for (var i = 0; i < num; i++) 
            myArray.push(i);
        return myArray;
    }

    divideFunction(num: number) 
	{
        return Math.floor(num / 4);
    }

    shuffle() 
	{
		
        var myarr = new Array();
        for (var x = 0; x < 15; x++) {
            myarr[x] = x + 1;
        }

        for (var i = 14; i > 0; i--) {
            var R = Math.floor(Math.random() * (i + 1));
            var tmp = myarr[i];
            myarr[i] = myarr[R];
            myarr[R] = tmp;
        }

        for (var i = 0; i < 15; i++) {
            let elem: HTMLInputElement = <HTMLInputElement>document.getElementById(i + "");
            
			elem.tabIndex = i;
			
			var R = 150 + Math.floor(Math.random() * 105);
            var G = 150 + Math.floor(Math.random() * 105);
            var B = 150 + Math.floor(Math.random() * 105);
            
			elem.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
            
			elem.innerHTML = myarr[i].toString();
            
            elem.style.left = i % 4 * 60 + "px";
            elem.style.top = this.divideFunction(i) * 60 + "px";

        }
        this.indexEmpty = 15;
	
    }


    myClick($event) {
		
		
        var buttonmove = $event.target;
        var currTabIndex = buttonmove.tabIndex;
		var newX:number;
		var newY:number;
		
        var i1 = currTabIndex % 4;
        var j1 = currTabIndex / 4;
		if(j1 != 0)
			j1= Math.floor(j1);
		
        var i2 = this.indexEmpty % 4;
        var j2 = this.indexEmpty / 4;
		if(j2 != 0)
			j2= Math.floor(j2);


        if (Math.abs(i1 - i2) + Math.abs(j1 - j2) == 1) {
            if (i1 > i2) {
                buttonmove.style['animation-name'] = "Leftt";
				newX = buttonmove.offsetLeft - 60;
				newY = buttonmove.offsetTop;

            }
            if (i1 < i2) {
                buttonmove.style['animation-name'] = "Rightt";
				newX = buttonmove.offsetLeft + 60;
				newY = buttonmove.offsetTop;

            }
            if (j1 > j2) {
               buttonmove.style['animation-name'] = "Upp";
				newX = buttonmove.offsetLeft;
				newY = buttonmove.offsetTop - 60;

            }
            if (j1 < j2) {
                buttonmove.style['animation-name'] = "Downn";
				newX = buttonmove.offsetLeft;
				newY = buttonmove.offsetTop + 60;

            }
			buttonmove.style['animation-play-state'] = "running";
            
		setTimeout(() => {
            buttonmove.style.left = newX + "px";
            buttonmove.style.top = newY + "px";
            buttonmove.style['animation-name'] = "none";
            buttonmove.style['animation-play-state'] = "none";
			buttonmove.tabIndex = this.indexEmpty;
            this.indexEmpty = currTabIndex;
            this.check();
        }, 400);

	}

    }


    check() {
		
        let button1: HTMLInputElement = <HTMLInputElement>document.elementFromPoint(0, 0);
        let button2: HTMLInputElement = <HTMLInputElement>document.elementFromPoint(60, 0); 
        var b1 = button1.innerHTML;
        var b2 = button2.innerHTML;
        
        if (b1 == "1" && b2 == "2") {  
                    
            if (confirm("You Win!! play again???") == true) {
                this.shuffle();
            } else {
                
            }
        }
    }

}
