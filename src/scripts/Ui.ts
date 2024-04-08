import { Container, Sprite, Texture } from "pixi.js";
import { Globals } from "./Globals";
import { config } from "./appConfig";
import { TextureRegion } from "pixi-spine";
import { Easing, Tween } from "@tweenjs/tween.js";

export class UiContainer extends Container
{
	bottomLFrame !: Sprite;
	bottomRFrame !: Sprite;

	UpperMiddleFrame!: Sprite;
    bottomMiddleFrame!: Sprite;
   

	constructor()
	{
		super();
		this.initFrame();
		this.uiButtons();
	}

	uiButtons()
	{
		const shareBtn = new uiButton(Globals.resources.shareBtn.texture,()=>{Globals.emitter?.Call("Popup")});
		this.addChild(shareBtn);

		const announcmentBtn = new uiButton(Globals.resources.AnnouncmentBtn.texture,()=>{});
		this.addChild(announcmentBtn);
	
		
		const PasswordBtn = new uiButton(Globals.resources.AnnouncmentBtn.texture,()=>{});
		this.addChild(PasswordBtn);

		const settingBtn = new uiButton(Globals.resources.settingBtn.texture,()=>{});
		this.addChild(settingBtn);

		shareBtn.setPos(300,config.logicalHeight - shareBtn.height/2 - 20);
		announcmentBtn.setPos(500,config.logicalHeight - shareBtn.height/2- 20);
		PasswordBtn.setPos(1400,config.logicalHeight - PasswordBtn.height/2- 20);
		settingBtn.setPos(1600,config.logicalHeight - shareBtn.height/2- 20);
	}

	initFrame()
	{
		this.bottomLFrame = new Sprite(Globals.resources.bottomLFrame.texture);
		this.addChild(this.bottomLFrame);
        this.bottomLFrame.scale.set(1);
		this.bottomLFrame.anchor.set(1,0.5);
		
		this.bottomRFrame = new Sprite(Globals.resources.bottomRFrame.texture);
		this.addChild(this.bottomRFrame);
        this.bottomRFrame.scale.set(1);
		this.bottomRFrame.anchor.set(0,0.5);
        
		    
		const Frame = new Sprite(Globals.resources.upperFrame.texture);
		this.addChild(Frame);
		Frame.anchor.set(0.5,0);
        Frame.scale.set(1);

		this.UpperMiddleFrame = new Sprite(Globals.resources.UpperMiddleFrame.texture);
		this.addChild(this.UpperMiddleFrame);
		this.UpperMiddleFrame.anchor.set(0.5);
        this.UpperMiddleFrame.scale.set(1);
		this.UpperMiddleFrame.position.set(config.logicalWidth/2   ,this.UpperMiddleFrame.height/2);

        this.bottomMiddleFrame = new Sprite(Globals.resources.BottmMiddle.texture);
		this.addChild(this.bottomMiddleFrame);
		this.bottomMiddleFrame.anchor.set(0.5);
        this.bottomMiddleFrame.scale.set(1);
		this.bottomMiddleFrame.position.set(config.logicalWidth/2   ,config.logicalHeight - this.bottomMiddleFrame.height/2);
    
		Frame.position.set(config.logicalWidth/2,0);

		this.bottomLFrame.position.set(this.bottomMiddleFrame.position.x - this.bottomMiddleFrame.width/2 + 20,config.logicalHeight - this.bottomLFrame.height/2);
		this.bottomRFrame.position.set(this.bottomMiddleFrame.position.x + this.bottomMiddleFrame.width/2 - 20,config.logicalHeight - this.bottomLFrame.height/2);
	}
}


export class uiButton extends Sprite
{

	
	constructor(uiTexture : Texture | undefined ,callBack : () =>void)
	{
		super(uiTexture);

		this.anchor.set(0.5);
		this.scale.set(0.9);
		this.interactive = true;
		this.buttonMode = true;
		this.on("pointerdown",()=>{callBack(); this.tweenBtn();})
	}
	tweenBtn()
	{
		this.interactive = false;
		new Tween(this.scale)
		.to({x : 1,y :1},50)
		.easing(Easing.Bounce.InOut)
		.yoyo(true)
		.onComplete(()=>{this.interactive = true;})
		.repeat(1)
		.start();
	}

	setPos(x : number,y : number){this.position.set(x,y);}
}


