import { Container, DisplayObject, Graphics, Resource, Sprite, Texture } from "pixi.js";
import { config } from "./appConfig";
import { AnimatedBackgroundSprite, Background, BackgroundGraphic, BackgroundSprite } from "./Background";
import { Globals } from "./Globals";
import { staticData } from "./LoaderConfig";

export abstract class Scene {


    private sceneContainer: Container;
    private fullBackground: number  = 0x000000;


    mainContainer: Container;
    // mainBackground: BackgroundGraphic;
    private mainBackground!: BackgroundGraphic | BackgroundSprite;


    constructor(BackGroundS : Sprite | undefined , BackGroundG : Graphics | undefined) {
        this.sceneContainer = new Container();
        
        this.mainContainer = new Container();
        this.resetMainContainer();
        
        // this.mainBackground = new BackgroundGraphic(config.logicalWidth, config.logicalHeight, this.fullBackground);
   
        if(BackGroundS)
        this.mainBackground = new BackgroundSprite(BackGroundS.texture,window.innerWidth,window.innerHeight);
        else
        this.mainBackground = new BackgroundGraphic(window.innerWidth,window.innerHeight,BackGroundG);

        this.addChildToFullScene(this.mainBackground);


        this.sceneContainer.addChild(this.mainContainer);


        // const mask = new Graphics();
        // mask.beginFill(0xffffff);
        // mask.drawRect(0, 0, config.logicalWidth, config.logicalHeight);
        // mask.endFill();
        // this.mainContainer.addChild(mask);
        // this.mainContainer.mask = mask;

    }

    // changeBackgroundSprite(index: number) {
    //     this.fullBackground.updateBackgroundIndex(index);
    // }

    resetMainContainer() {
        this.mainContainer.x = config.minLeftX;
        this.mainContainer.y = config.minTopY;
        this.mainContainer.scale.set(config.minScaleFactor);
    }
    addToScene(obj: DisplayObject) {
        this.sceneContainer.addChild(obj);

    }
    resize(): void {
        this.resetMainContainer();
        this.mainBackground.resetBg(window.innerWidth, window.innerHeight);
    }

    initScene(container: Container) {
        container.addChild(this.sceneContainer);
    }
    destroyScene() {
        this.sceneContainer.destroy();
    }

    addChildToFullScene(component: DisplayObject) {
        this.sceneContainer.addChild(component);

    }
    addChildToIndexFullScene(component: DisplayObject, index: number) {
        this.sceneContainer.addChildAt(component, index);
    }



    abstract update(dt: number): void;

    abstract recievedMessage(msgType: string, msgParams: any): void;
}