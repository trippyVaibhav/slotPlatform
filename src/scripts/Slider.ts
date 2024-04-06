import { Tween, Easing } from "@tweenjs/tween.js";
import { Container, AnimatedSprite, Sprite, Texture } from "pixi.js";
import { gameFrameData, Globals, createiFrame } from "./Globals";
import { config } from "./appConfig";
import { CreateSwitcher as SwitcherManager, Switcher } from "./switchPage";
import { GameData } from "./apiCalls";
import { Frames } from "./SlotButtonFrames";


export class gameClassManager extends Container
{
	sliderContainer : ButtonSlider[] = [];
	

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
		}
		this.sliderContainer.forEach(element => {
			this.addChild(element)
		});
		this.changeGamePage(0);
	}

	changeGamePage(index : number)
	{
		this.sliderContainer.forEach(element => {
			element.visible = false;
			element.interactive = false;
		});

		this.sliderContainer[index].visible = true;
		this.sliderContainer[index].interactive = true;
	}
}
export class  ButtonSlider extends Container
{
	gameButtons : Frames[] = [];
	switchManager : SwitcherManager;
	slotIndex : number = 0;
	gameData : GameData[] = [];

	constructor(gameDataInfo : GameData[])
	{
		// const text = new input
		super();

		this.gameData = gameDataInfo;

		
		this.createButtons();
		this.setInteraction();

		this.switchManager = new SwitcherManager(this.slotIndex);
		this.addChild(this.switchManager);
	}

	
	setInteraction()
	{
        let initialPosition = { x: 0, y: 0 };
        let offset = { x: 0, y: 0 };

        this.interactive = true;
        let currentPos : any;
        this.on('pointerdown', (event) => {
            gameFrameData.isDragging = true;
            initialPosition = this.position.clone();
            offset = event.data.getLocalPosition(this);
			console.log("Draggg");
			currentPos = offset;
        });

        this.on('pointerup', (event) => {
            if(gameFrameData.isDragging)
            {
                this.gameButtons.forEach(element => {element.interactive = true;});
                const newPosition = event.data.getLocalPosition(this.parent)
                console.log((newPosition.x - currentPos.x));
                
            }
            gameFrameData.isDragging = false;
        
        });

        this.on('pointermove', (event) => {
          
            if(gameFrameData.isDragging)
            {

                if(this.gameButtons[0].interactive)
                this.gameButtons.forEach(element => {element.interactive = false;});
            
            const newPosition = event.data.getLocalPosition(this.parent);
            let newX = newPosition.x - offset.x;
            newX = Math.max(-this.width + window.innerWidth, Math.min(0, newX)); // Limit track movement
            this.position.x = newX;
            
            // Adjust content position based on track movement
            const ratio = newX / (this.width - window.innerWidth);
            this.position.x = this.width/2 * ratio;
            
        }
        });
		this.on('pointerout', (event) => {
            if(gameFrameData.isDragging)
            {
                this.gameButtons.forEach(element => {element.interactive = true;});
                const newPosition = event.data.getLocalPosition(this.parent)
                console.log((newPosition.x - currentPos.x));
                gameFrameData.isDragging = false;
            }

        });
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
				this.slotIndex++;
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
