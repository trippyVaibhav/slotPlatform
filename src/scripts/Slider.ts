import { Tween, Easing } from "@tweenjs/tween.js";
import { Container, AnimatedSprite, Sprite, Texture } from "pixi.js";
import { gameFrameData, Globals, createiFrame } from "./Globals";
import { config } from "./appConfig";
import { CreateSwitcher as SwitcherManager, Switcher } from "./switchPage";
import { GameData } from "./apiCalls";
import { Frames } from "./SlotButtonFrames";
import { log } from "console";


export class gameClassManager extends Container
{
	sliderContainer : ButtonSlider[] = [];
	switchManager : SwitcherManager [] = [];
	currentGameIndex : number = 0;

	constructor()
	{
		super();
		this.gamePageInit();
	}

	gamePageInit()
	{
		let gameData;
		if(Globals.gameData)
		gameData = Globals.gameData;
		
		if(gameData)
		for(let i = 0 ; i < gameData.length ; i++)
		{
			const slider = new ButtonSlider(gameData[i])
			this.sliderContainer.push(slider);
			
			const switcher = new SwitcherManager(slider.slotPageLength,()=>{this.changePage()});
			this.switchManager.push(switcher);
			this.addChild(this.switchManager[i]);
		}
		this.sliderContainer.forEach(element => {
			this.addChild(element)
		});
		this.changeGame(0);
	}
	
	makePageMoveRight(moveRight : boolean)
	{
		
		let currentPageIndex = 0;
		
		if(moveRight)
		{
			currentPageIndex = this.switchManager[this.currentGameIndex].currentPage;
			if(currentPageIndex >= this.switchManager[this.currentGameIndex].switcher.length-1)
			currentPageIndex = 0;
			else
			currentPageIndex++;
		}
		else
		{
		console.log(this.switchManager[this.currentGameIndex].switcher.length);

			currentPageIndex = this.switchManager[ this.currentGameIndex].currentPage;
			if(currentPageIndex <= 0 )
			currentPageIndex =  this.switchManager[ this.currentGameIndex].switcher.length-1;
			else 
			currentPageIndex--; 
		}
		console.log("Calledd MOVEEEE",currentPageIndex);

		this.switchManager[this.currentGameIndex].changePage(currentPageIndex);
	}

	changePage()
	{
		console.log(this.switchManager[this.currentGameIndex].currentPage);
		
		if(this.switchManager[ this.currentGameIndex])
		this.sliderContainer[this.currentGameIndex].changePage(this.switchManager[this.currentGameIndex].currentPage);
	}
	changeGame(index : number)
	{
		this.currentGameIndex = index;
		for(let i = 0; i < this.sliderContainer.length; i++)
			{
				this.sliderContainer[i].visible = false;
				this.sliderContainer[i].interactive = false;

				this.switchManager[i].visible = false;
				this.switchManager[i].interactive = false;
			}	
		
		this.switchManager[index].visible = true;
		this.switchManager[index].interactive = true;

		this.sliderContainer[index].visible = true;
		this.sliderContainer[index].interactive = true;
	}
}

export class  ButtonSlider extends Container
{
	gameButtons : Frames[] = [];
	slotPageLength : number = 0;
	currentGamePageIndex : number = 0;

	gameData : GameData[] = [];

	constructor(gameDataInfo : GameData[])
	{
		// const text = new input
		super();

		this.gameData = gameDataInfo;
		this.createButtons();
		this.setInteraction();
	}

	changePage(index : number)
	{
		console.log(index, this.currentGamePageIndex);
		console.log(index -this.currentGamePageIndex);
		
		let xOffSet =  2900;

		// if(index -this.currentGamePageIndex <0)
		// xOffSet = (index -this.currentGamePageIndex)*xOffSet;
		// else

		// console.log(index - this.currentGamePageIndex);
		
		xOffSet = (index - this.currentGamePageIndex)*xOffSet;
	  	
		new Tween(this.position)
		.to({x : this.position.x - xOffSet, y: this.position.y},200)
		.easing(Easing.Cubic.In)
		.start();
		this.currentGamePageIndex = index;
	}
	
	setInteraction()
	{
		let mouseDown : boolean = false;
        let initialPosition = { x: 0, y: 0 };
        let offset = { x: 0, y: 0 };

        this.interactive = true;
        let currentPos : any;
        this.on('pointerdown', (event) => {
            initialPosition = this.position.clone();
            currentPos = event.data.global;
			console.log(currentPos);
		
			mouseDown = true;
        });

        this.on('pointerup', (event) => {
            if(gameFrameData.isDragging && mouseDown)
            {
                this.gameButtons.forEach(element => {element.interactive = true;});
                let newPosition = event.data.getLocalPosition(this.parent);
				console.log("In : " + (newPosition.x - currentPos.x));
				
				if( newPosition.x - currentPos.x < -50)
				Globals.emitter?.Call("MoveRight")
					
				if( newPosition.x -currentPos.x > 50)
				Globals.emitter?.Call("MoveLeft")
					
				mouseDown = false;
            }
			gameFrameData.isDragging = false;
        });

        this.on('pointermove', (event) => {
            gameFrameData.isDragging = true;
          
            if(gameFrameData.isDragging && mouseDown)
            {

            if(this.gameButtons[0].interactive)
            this.gameButtons.forEach(element => {element.interactive = false;});
            
            // const newPosition = event.data.getLocalPosition(this.parent);
			// console.log(newPosition.x);
			
            // let newX = newPosition.x - offset.x;
            // newX = Math.max(-this.width + 1500, Math.min(0, newX)); // Limit track movement
            // this.position.x = newX;
            
            // // Adjust content position based on track movement
            // const ratio = newX / (this.width - 1500);
            // this.position.x = this.width/2 * ratio;
            
        }
        });
		this.on('pointerout', (event) => {
            if(gameFrameData.isDragging && mouseDown)
            {
                this.gameButtons.forEach(element => {element.interactive = true;});
                let newPosition = event.data.getLocalPosition(this.parent);
				console.log("Out : " + (newPosition.x - currentPos.x));
				
				if(newPosition.x - currentPos.x < -50)
				Globals.emitter?.Call("MoveLeft")

				if(newPosition.x - currentPos.x > 50)
				Globals.emitter?.Call("MoveRight")
				
		}
		mouseDown = false;
		gameFrameData.isDragging = false;
        });

		this.on("wheel",(event)=>{
			let currentScrollY = event.deltaY;
			console.log(event);
			
			// Determine scroll direction
			if (currentScrollY > 0) {
				// Scrolling down
				console.log("Scrolling down");
			} else {
				// Scrolling up
				console.log("Scrolling up");
			}
		})
	}

	createButtons()
	{
		let xpos = 300;
		let ySlot1Pos = config.logicalHeight/2.8;
		let onSecondSlot = false;

		for(let i = 0 ; i < this.gameData.length ; i++)
		{
			let canStart = false;
			
			const button = new Frames(this.gameData[i]);
			this.addChild(button);
		
			if(i >= 1)
			xpos = this.gameButtons[this.gameButtons.length-1].position.x + button.width*0.6;

			if(i%8 == 0&& i!= 0)
			{
				onSecondSlot = !onSecondSlot;
				xpos = this.gameButtons[this.gameButtons.length-1].position.x +  button.width*5;
				canStart = true;
				this.slotPageLength++;
			}	
	
			if(i%4 == 0 && i!= 0 && !canStart)
			{
				onSecondSlot = true;
				xpos = this.gameButtons[this.gameButtons.length-4].position.x - button.width/2;
			}

			if(onSecondSlot)
			button.position.y = ySlot1Pos + button.height*1.1;
			else
			button.position.y = ySlot1Pos;
			
			button.position.x = button.width/2 + xpos;
			this.gameButtons.push(button);
		}
	}
}
