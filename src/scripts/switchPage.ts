import { AnimatedSprite, Container } from "pixi.js";
import { Globals, gameFrameData } from "./Globals";
import { extname } from "path";
import { config } from "./appConfig";


export class CreateSwitcher extends Container
{
	switcher:Switcher[] = [];
	currentPage : number = 0;
	callbackfn : ()=> void;

    constructor(slotIndex : number,callBack : ()=>void)
    {
        super();
		this.callbackfn = callBack;

        let xpos = 200;
		for(let i = 0 ; i <= slotIndex; i++)
		{
			const switcherIcon = new Switcher(()=>{this.changePage(i)},i);
			this.addChild(switcherIcon);
				if(i == 0)
				{
					xpos = config.logicalWidth/2 - switcherIcon.width* slotIndex;
				}
				switcherIcon.position.set(xpos ,config.logicalHeight/1.2);
			xpos += switcherIcon.width*2;
			this.switcher.push(switcherIcon);
		}
		this.changePage(0);
    }
	
    
    changePage(index : number)
	{
		this.currentPage = index;
		this.callbackfn();
		
		this.switcher.forEach(element => {
			element.onSwitch(false);
		});

		this.switcher[this.currentPage].onSwitch(true)
	}
}



export class Switcher extends AnimatedSprite 
{
	isOn : boolean = false;
	callBackFn: () => void
	constructor(callBack : () =>void ,index : number)
	{
		
		const switcherTexture : any = [Globals.resources.switcherOff.texture,Globals.resources.switcherOn.texture];
		super(switcherTexture);
		this.anchor.set(0.5);
		this.scale.set(1.1)

		this.callBackFn = callBack;

		this.interactive = true;
		this.buttonMode = true;
		this.on("pointerdown",()=>{callBack()});
	}

	onSwitch(shouldOn : boolean)
	{
		
		if(shouldOn)
		this.gotoAndStop(1);
		else
		this.gotoAndStop(0);

	}
}