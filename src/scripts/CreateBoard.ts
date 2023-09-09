import { Graphics } from "pixi.js";
import * as PIXI from 'pixi.js';
import { boardConfig as getBoardConfig, boardConfigVar, getLineinfo, slotCharArr } from './Globals';
import { Lines } from "./Lines";
import { Slots } from './Slots';
import { get } from "http";
import { log } from "console";
import { TextLabel } from "./TextLabel";
import { Symbol } from "./Symbol";
import { setInterval } from "timers/promises";
import { config } from "./appConfig";

export class CreateBoard extends Graphics
{
    board !: Graphics;
    slotArr : Slots[][] = [];

    lines : Lines [] = [];
    slotChar : Symbol [][] = [];
    charMask !: Graphics;
    winningSlots : Symbol[][] = [];
    

    constructor()
    {
        super();

        let boardConfig = getBoardConfig();
        boardConfigVar.boardBoxWidth = boardConfig[0];
        boardConfigVar.boardBoxHeight = boardConfig[1];
        
        this.board = new PIXI.Graphics;
        this.board.beginFill();
        this.addChild(this.board);

        this.board.position.x = window.innerWidth/2 * config.minScaleFactor ;
        this.board.position.y = window.innerHeight/2 * config.minScaleFactor;

        boardConfigVar.boardPosY =  this.board.position.y;

        this.charMask = new Graphics();
        this.charMask.beginFill(0xffffff);
        this.charMask.drawRect(0, 0,boardConfigVar.boardBoxWidth*boardConfigVar.Matrix.x+10,boardConfigVar.boardBoxHeight*boardConfigVar.Matrix.y+10);
        this.charMask.endFill();
        this.charMask.position.x = this.board.position.x;
        this.charMask.position.y = this.board.position.y;
        this.addChild(this.charMask);

        this.addSlots();
        this.makeLines();
        this.addChar();
    }

    addSlots()
    { 
        let positionX = 0;
        let positionY = 0;

        for(let i = 0 ; i < boardConfigVar.Matrix.y; i++)
        {
           this.slotArr[i] = [];
            for(let j = 0; j <  boardConfigVar.Matrix.x; j++)
            { 
        
                this.slotArr[i][j] = new Slots({ x: positionX, y : positionY},i,j);
                positionX = this.slotArr[i][j].slot.position.x+ this.slotArr[i][j].width;
             
                if(j ==  boardConfigVar.Matrix.x-1 )
                {
                    positionX = 0;
                    positionY = this.slotArr[i][j].slot.position.y+ this.slotArr[i][j].height;
                }
                this.board.addChild(this.slotArr[i][j].slot);
            }
        }
    }

    addChar()
    {
       let xPos = boardConfigVar.boardBoxWidth/2 ;
       let yPos = this.slotArr[boardConfigVar.Matrix.y-1][0].slot.position.y + this.slotArr[boardConfigVar.Matrix.y-1][0].slot.width/2.5 ;
        
       const shuffledArray: string[][] = this.shuffle2DArray(slotCharArr.charArr);
      for(let i =0 ;  i < shuffledArray.length ; i ++)
        {
            this.slotChar[i] = []; 
            
            for(let j =shuffledArray[0].length-1; j >=0 ; j--)
            {
                let char = new Symbol(0.02,shuffledArray[i][j],{x: xPos, y: yPos});
                yPos = yPos - boardConfigVar.boardBoxHeight;
                char.position.x = char.position.x;
                this.slotChar[i][j] = char;
                this.slotChar[i][j].mask = this.charMask;
                this.board.addChild(char);
            }
            xPos += boardConfigVar.boardBoxWidth  ;
            yPos = this.slotArr[boardConfigVar.Matrix.y-1][0].slot.position.y + this.slotArr[boardConfigVar.Matrix.y-1][0].slot.width/2.5;

        }
       
    }

    makeLines()
    {
   
        const entries = Object.entries(getLineinfo);
        for(let i = 0; i < entries.length ; i++)
        {
            let lineInfo;

            lineInfo = getLineinfo[i];     
            let line = new Lines(lineInfo.color,lineInfo.xPos,0,lineInfo.yPos,this.getLineLocation(lineInfo.locations,lineInfo.xPos));
            this.lines.push(line);
            this.board.addChild(line);
            // console.log(line);
        }
    }

    getLineLocation (lineInfo : number[][], side : boolean)
    {
        let lineArray = [];
    //    console.log(this.slotArr[0][0].slot.position.x + boardConfigVar.boardBoxWidth/2);
        for(let i = 0; i < lineInfo.length; i++)
        {
            let xIndex  = lineInfo[i][0];
            let yIndex = lineInfo[i][1];

            if(!side)
            lineArray[i]  = {x : this.slotArr[xIndex][yIndex].slot.position.x, y: this.slotArr[xIndex][yIndex].slot.position.y };
            else
            lineArray[i]  = {x : -this.slotArr[xIndex][yIndex].slot.position.x, y: this.slotArr[xIndex][yIndex].slot.position.y };
            
            // console.log(lineArray[i].x);
        }
        return lineArray;
    }

    update(dt : number)
    {
        for(let i =slotCharArr.charArr.length-1 ;  i >= 0 ; i -- )
        {
            for(let j = slotCharArr.charArr[0].length-1; j >=0 ; j--)
            {
                if(boardConfigVar.shouldMove)
                {
                    this.slotChar[i][j].position.y += 20*dt;

                    if( this.slotChar[i][j].position.y > boardConfigVar.restartPos)
                    {
                        if(j != 8 )
                        this.slotChar[i][j].position.y = this.slotChar[i][j+1].position.y - this.slotChar[i][j].width*1.4;
                        else
                        {
                            this.slotChar[i][j].position.y = this.slotChar[i][0].position.y - this.slotChar[i][8].width;
                        }
                    }
                }
            }
        }
    }

    checkSlot()
    {
        let x ;
        
//         console.log( this.slotArr[0][0].slot.position.x -  this.slotArr[0][0].slot.width);
   
        for(let i = 0 ; i < this.slotChar[0].length ; i++)
        {
            if( this.slotChar[0][i].position.y > this.slotArr[0][boardConfigVar.Matrix.y].slot.width*0.5 
                && this.slotChar[0][i].position.y < this.slotArr[0][boardConfigVar.Matrix.y].slot.width*1.5 ) 
            {
               if(x == undefined)
               this.addOnSlot(i)
            }
        }
        ///END Position this.slotArr[0][boardConfigVar.Matrix.y].slot.width*2
    }

    addOnSlot(winningIndex : number)
    {
        for(let  j = 0 ; j  <  this.slotArr.length ; j++)
        {
            for(let  i = 0 ; i < this.slotArr[0].length; i++)
            {
                
                let index = (winningIndex -( this.slotArr.length-1))+j;
                
                if(index < 0)
                index = 8-j;
                this.slotArr[j][i].currentSlotSymbol = this.slotChar[i][index].symbol;
            }
        }

        let yPos : number;
        yPos = this.slotArr[0][boardConfigVar.Matrix.y].slot.width*2.1 - this.slotChar[0][winningIndex].position.y;
        
        for(let i = 0 ;  i <= slotCharArr.charArr.length-1 ; i ++ )
        {
            for(let j = 0; j  < slotCharArr.charArr[0].length ; j++)
            {
                this.slotChar[i][j].tweenToSlot(yPos,false)
            }
        }
        //    this.getSlotCurrentSymbols(); 
        // For checking
        this.checkWinPaylines();
        
    }
    startSpin()
    {
        for(let i =slotCharArr.charArr.length-1 ;  i >= 0 ; i -- )
        {
            for(let j = slotCharArr.charArr[0].length-1; j >=0 ; j--)
            {
            this.slotChar[i][j].tweenToSlot(200,true);
            }
        }
    }

    checkWinPaylines()
    {
        const entries = Object.entries(getLineinfo);
        let points  = 0;
        for(let i = 0; i < entries.length ; i++)
        {
            let  lineInfo = getLineinfo[i]; 
            let lastSymbol = undefined; 
          for(let j = 0; j < lineInfo.locations.length ; j ++)
          {
            let xIndex =lineInfo.locations[j][0];
            let yIndex =lineInfo.locations[j][1]; 
            
        //    console.log("xIndex  : " + xIndex + "yIndex  : " + yIndex);
        //    console.log("Last Symbol : " + lastSymbol + "Current Symbol : " + this.slotArr[xIndex][yIndex].currentSlotSymbol);
           if(lastSymbol == undefined)
           lastSymbol = this.slotArr[xIndex][yIndex].currentSlotSymbol;

           if(lastSymbol && lastSymbol == this.slotArr[xIndex][yIndex].currentSlotSymbol)
           {
            //    console.log( "Same " + this.slotArr[xIndex][yIndex].currentSlotSymbol); 
               points++;
           }
            else
            {
                if(points == 1)
                points--;
                // console.log("not same ");
                break;
            }
          }
        }
        console.log("points : " + points);
    }


    getSlotCurrentSymbols()
    {
        for(let i = 0 ; i < boardConfigVar.Matrix.y; i++)
        {
            for(let j = 0; j <  boardConfigVar.Matrix.x ; j++)
            { 
                // console.log( "Symbol " + this.slotArr[i][j].currentSlotSymbol );
                console.log(i,j);
                
            }
        }

    }

    clearCurrentSort()
    {
        for(let i = 0 ; i < boardConfigVar.Matrix.y; i++)
        {
            for(let j = 0; j <  boardConfigVar.Matrix.x; j++)
            { 
                this.slotArr[i][j].currentSlotSymbol = "-1";
                // console.log( "Symbol " + this.slotArr[i][j].currentSlotSymbol );
            }
        }
    }

    shuffle2DArray(array: string[][]): string[][] {
        const rows: number = array.length;
        const cols: number = array[0].length;
      
        for (let i = rows - 1; i > 0; i--) {
          for (let j = cols - 1; j > 0; j--) {
            const i1: number = Math.floor(Math.random() * (i + 1));
            const j1: number = Math.floor(Math.random() * (j + 1));
      
            // Swap elements at (i, j) and (i1, j1)
            [array[i][j], array[i1][j1]] = [array[i1][j1], array[i][j]];
          }
        }
      
        return array;
      }
}