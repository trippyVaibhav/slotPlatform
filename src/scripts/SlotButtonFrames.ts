import { Tween, Easing } from "@tweenjs/tween.js";
import { Sprite, Texture, AnimatedSprite } from "pixi.js";
import { Globals, createiFrame } from "./Globals";
import { GameData } from "./apiCalls";

export class Frames extends Sprite
{
	id : String = "-1";
    buttonData : GameData;
    thumbnail : Sprite;

	constructor(gameData : GameData)
	{
		super(Globals.resources.Frame.texture);
        this.buttonData = gameData;
		
        this.anchor.set(0.5);
		this.scale.set(0.85);
		this.id = gameData.toString();

		const texture = Texture.from(gameData.gameThumbnailUrl);
		this.thumbnail = new Sprite(texture);
		this.addChild(this.thumbnail);
		this.thumbnail.anchor.set(0.5);
		this.thumbnail.scale.set(1);
        
        const FavBtn = new FavButton()
		this.addChild(FavBtn);
		FavBtn.position.set(this.width/2 ,-this.height/2 + FavBtn.height/2 );

        if(gameData.isHot)
        this.addExtra(true);

        if(gameData.isNew)
        this.addExtra(false);

        this.buttonInteractivity();
	}

	buttonInteractivity()
	{
		this.thumbnail.buttonMode = true;
		this.thumbnail.interactive = true;
        
        let currentMousePos : any;
		this.thumbnail.on("pointerdown",(event)=>{
		
            currentMousePos = event.data.getLocalPosition(this.parent);
				new Tween(this.scale)
				.to({x : 0.7, y :0.7},200)
				.easing(Easing.Bounce.InOut)
				.yoyo(true)
				.repeat(1)
				.start();
				this.interactive = true;

		});
		const gameID =  Math.round(Math.random());
		// console.log("Game ID " + gameID);
		
		this.thumbnail.on("pointerup",(event)=>{
            const mousePos = event.data.getLocalPosition(this.parent);
            
            if(mousePos && currentMousePos )
            {
            if( Math.abs(currentMousePos.x) === Math.abs(mousePos.x) && Math.abs(currentMousePos.y) === Math.abs(mousePos.y))
            {

                console.log("old " +  Math.floor(currentMousePos.x) + "  current" + Math.floor(mousePos.x) );
                console.log("Called Perfect");
                
                createiFrame(gameID);
            }
            }
        });
		this.thumbnail.on("pointerout",(event)=>{if(currentMousePos)currentMousePos.x = -1});
	}

	addExtra(isHot : boolean)
    {
        let sprite :Sprite;
        if(isHot)
        {
            sprite = new Sprite(Globals.resources.HOT.texture);
        }
        else
        sprite = new Sprite(Globals.resources.NEW.texture);

        sprite.anchor.set(0.5);
        sprite.position.set(-this.width/2 + sprite.width/2 - 25,-this.height/2 + sprite.height/2 - 25);
        sprite.scale.set(1);
        this.addChild(sprite)

    }
}

export class FavButton extends Sprite
{
	isFav : boolean = false;
	constructor()
	{
		super(Globals.resources.favHolder.texture);
		this.anchor.set(0.5);
		this.interactive = true;
		
		const favHolder = new Sprite(Globals.resources.favHolder1.texture);
		this.addChild(favHolder);
		
		favHolder.anchor.set(0.5);
		favHolder.scale.set(0.9);
		favHolder.position.x = - favHolder.width/2 + 10;
		favHolder.interactive = true;
		favHolder.buttonMode = true;

	
		const favBtn = this.isFavBtn();
		favHolder.addChild(favBtn);

		favHolder.on("pointerdown",()=>{
			if(this.isFav)
			{
				this.isFav = false;
				favBtn.gotoAndStop(0);
			}
			else
			{
				this.isFav = true;
				favBtn.gotoAndStop(1);
			}
		})
	}	

	isFavBtn()
	{
		const favTexture : any= [Globals.resources.isNotFav.texture,Globals.resources.isFav.texture];
		const favAnimatedSpirte = new AnimatedSprite(favTexture);
		favAnimatedSpirte.anchor.set(0.5);

		if(!this.isFav)
		favAnimatedSpirte.gotoAndStop(0);
		else
		favAnimatedSpirte.gotoAndStop(1);

		return favAnimatedSpirte;
	}
}