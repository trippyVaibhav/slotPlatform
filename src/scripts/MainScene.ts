import { AnimatedSprite, Container, Graphics, Sprite } from "pixi.js";
import { Scene } from "./Scene";
import { Globals, createiFrame, gameFrameData } from "./Globals";
import { staticData } from "./LoaderConfig";
import { config, minScaleFactor } from "./appConfig";

import { ButtonSlider, gameClassManager } from "./Slider";
import { UiContainer } from "./Ui";
import { Easing, Tween } from "@tweenjs/tween.js";
import { Spine } from "pixi-spine";


export class MainScene extends Scene {
		 
	rightArrow !: Sprite;
	leftArrow !: Sprite;
	uiContainer : UiContainer;
	gameClassManager !: gameClassManager;

	constructor() {
		const Background = Sprite.from(staticData.Background);
		super(Background,undefined);

		if(Globals.gameApiLoaded)
		{
			this.gameClassManager = new gameClassManager();
			this.mainContainer.addChild(this.gameClassManager);
		}
		else
		this.createLoadSpinner();

		this.uiContainer = new UiContainer();
		this.mainContainer.addChild(this.uiContainer);
		
		
		this.frameMoveInit();

	}

	createLoadSpinner()
	{
		const overlay = new Graphics();
		overlay.beginFill(0x000000,0.6);
		overlay.drawRect(0,0,config.logicalWidth,config.logicalHeight);
		overlay.endFill();
		overlay.interactive =true;
		this.addChildToFullScene(overlay);

		let percent = 0;
		const spinner = new Graphics();
		spinner.rotation += 0.12;
		spinner
		  .clear()
		  .lineStyle(10, 0xffffff, 1)
		  .arc(0, 0, 40, 0, Math.PI * 2 * percent, false);
		percent = Math.abs(Math.sin(Date.now() / 1000));

		spinner.position.set(window.innerWidth/2,window.innerHeight/2);
		this.addChildToFullScene(spinner);
	
		new Tween(spinner)
		.onUpdate(()=>{
			if(!Globals.gameApiLoaded)
				{
					spinner
					.clear()
					.lineStyle(10, 0xffffff, 1)
					.moveTo(40, 0)
					.arc(0, 0, 40, 0, Math.PI * 2 * percent, false);
					percent = Math.abs(Math.sin(Date.now() / 1000));
				}
				else
				{
					this.removeChildFullScene(overlay);
					this.removeChildFullScene(spinner);
				}
		})
		.repeat(Infinity)
		.start();

	}
	
	frameMoveInit()
	{
		this.rightArrow = new Sprite(Globals.resources.Arrow.texture);
		this.rightArrow.anchor.set(1,0.5);
		this.rightArrow.scale.set(2);
		this.rightArrow.position.set(config.logicalWidth,config.logicalHeight/2 + this.rightArrow.height/2)
		this.mainContainer.addChild(this.rightArrow);
		this.rightArrow.interactive = true;
		this.rightArrow.buttonMode = true;
		this.rightArrow.on("pointerdown",()=>{
			this.tweenObj(this.rightArrow);
			this.gameClassManager.makePageMoveRight(true);
		});

		this.leftArrow = new Sprite(Globals.resources.Arrow.texture);
		this.leftArrow.anchor.set(0,0.5);
		this.leftArrow.scale.set(-2);
		this.mainContainer.addChild(this.leftArrow);
		this.leftArrow.position.set(this.leftArrow.width,config.logicalHeight/2 + this.leftArrow.height/2 );
		this.leftArrow.interactive = true;
		this.leftArrow.buttonMode = true;
		this.leftArrow.on("pointerdown",()=>{
			this.tweenObj(this.leftArrow);
			this.gameClassManager.makePageMoveRight(false);
		});

		
	}


	resize(): void 
	{
		super.resize();
	}
	
	update(dt: number): void { 

	}

	recievedMessage(msgType: string, msgParams: any): void {
		
		if(msgType == "MoveRight")
			{
				console.log("CALLED RIGHT");
				this.gameClassManager.makePageMoveRight(true);
			}
		
		if(msgType == "MoveLeft")
		{
			this.gameClassManager.makePageMoveRight(false);
			console.log("CALLED LEFT");
		}

		if(msgType == "CallPageInit")
		{
			this.gameClassManager = new gameClassManager();
			this.mainContainer.addChild(this.gameClassManager);
		}
	}
	tweenObj(sprite :Sprite)
	{
		const scale = sprite.scale;
		sprite.interactive = false;
		new Tween(sprite.scale)
		.to({x :scale.x*1.2, y :scale.y*1.2},100)
		.easing(Easing.Bounce.InOut)
		.yoyo(true)
		.repeat(1)
		.onComplete(()=>{sprite.interactive = true;})
		.start();
	}
}
