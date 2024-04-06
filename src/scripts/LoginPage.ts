import { Container, Graphics, Sprite } from "pixi.js";
import { Scene } from "./Scene";
import { Globals } from "./Globals";
import { SceneManager } from "./SceneManager";
import { MainScene } from "./MainScene";


export class LoginScene extends Scene {
		 
	constructor() {
		const sprite = new Sprite(Globals.resources.loginPage.texture);
		super(sprite,undefined);

		
		const userNameField = new Sprite(Globals.resources.InputField.texture);
		this.mainContainer.addChild(userNameField);
		userNameField.anchor.set(0.5);
		userNameField.position.set(1550,550);

		const passwordField = new Sprite(Globals.resources.InputField.texture);
		this.mainContainer.addChild(passwordField);
		passwordField.anchor.set(0.5);
		passwordField.position.set(1550,650);

		const loginBtn = new Sprite(Globals.resources.loginBtn.texture);
		this.mainContainer.addChild(loginBtn);
		loginBtn.anchor.set(0.5);
		loginBtn.position.set(passwordField.position.x,800);
		loginBtn.interactive = true;
		loginBtn.buttonMode = true;

		loginBtn.on("pointerdown",()=>{SceneManager.instance.start(new MainScene)})
		
	}

	
	

	resize(): void {
	super.resize();

	}

	update(dt: number): void { 

	}

	recievedMessage(msgType: string, msgParams: any): void {

	}

}

