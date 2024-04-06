import { AnimatedSprite, Container, Graphics, Sprite } from "pixi.js";
import { Scene } from "./Scene";
import { Globals, createiFrame, gameFrameData } from "./Globals";
import { staticData } from "./LoaderConfig";
import { config, minScaleFactor } from "./appConfig";

import { ButtonSlider, gameClassManager } from "./Slider";
import { UiContainer } from "./Ui";
import { Easing, Tween } from "@tweenjs/tween.js";


export class MainScene extends Scene {
		 
	rightArrow !: Sprite;
	leftArrow !: Sprite;
	uiContainer : UiContainer;
	gameClassManager : gameClassManager;

	constructor() {
		const Background = Sprite.from(staticData.Background);
		super(Background,undefined);

		this.gameClassManager = new gameClassManager();
		this.mainContainer.addChild(this.gameClassManager);

		this.uiContainer = new UiContainer();
		this.mainContainer.addChild(this.uiContainer);
		
		
		this.frameMoveInit();


	}
	
	frameMoveInit()
	{
		this.rightArrow = new Sprite(Globals.resources.Arrow.texture);
		this.rightArrow.anchor.set(1,0.5);
		this.rightArrow.scale.set(1);
		this.rightArrow.position.set(config.logicalWidth,config.logicalHeight/2 + this.rightArrow.height/2)
		this.mainContainer.addChild(this.rightArrow);
		this.rightArrow.interactive = true;
		this.rightArrow.buttonMode = true;
		this.rightArrow.on("pointerdown",()=>{
			this.tweenObj(this.rightArrow);
		});

		this.leftArrow = new Sprite(Globals.resources.Arrow.texture);
		this.leftArrow.anchor.set(0,0.5);
		this.leftArrow.scale.set(-1);
		this.mainContainer.addChild(this.leftArrow);
		this.leftArrow.position.set(this.leftArrow.width,config.logicalHeight/2 + this.leftArrow.height/2 );
		this.leftArrow.interactive = true;
		this.leftArrow.buttonMode = true;
		this.leftArrow.on("pointerdown",()=>{
			this.tweenObj(this.leftArrow);
		});

		
	}


	resize(): void 
	{
		super.resize();
	}
	
	update(dt: number): void { 

	}

	recievedMessage(msgType: string, msgParams: any): void {
	
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
