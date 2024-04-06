import { Container, Sprite } from "pixi.js";
import { Globals } from "./Globals";
import { config } from "./appConfig";

export class UiContainer extends Container
{
	bottomLFrame : Sprite;
	bottomRFrame : Sprite;

	UpperMiddleFrame: Sprite;
    bottomMiddleFrame: Sprite;
   

	constructor()
	{
		super();
        
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
