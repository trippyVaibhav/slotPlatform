  
import { Howl } from 'howler';
import * as PIXI from 'pixi.js';
import { App } from './App';
import { MyEmitter } from './MyEmitter';
import {GameData} from'./apiCalls'

type globalDataType = {
  resources: PIXI.utils.Dict<PIXI.LoaderResource>;
  emitter: MyEmitter | undefined;
  isMobile: boolean;
  // fpsStats : Stats | undefined,
  soundResources: { [key: string]: Howl };

  App: App | undefined,
  gameData : GameData[][] | undefined,
}

export const Globals: globalDataType = {
  resources: {},
  emitter: undefined,
  get isMobile() {
    //  return true;
    return PIXI.utils.isMobile.any;
  },
  // fpsStats: undefined,
  App: undefined,
  soundResources: {},
  gameData : undefined,
};

export const gameFrameData = {
isDragging  : false,
currentIndex : 0,
currentGamePage : 0,
}

enum GameLinks {
  Link0 = "https://exmpcheck.netlify.app",
  Link1 = "https://goldenchinatown.netlify.app"
}

export function createiFrame(gameNumber: number)
{
  const gameLinks = (GameLinks as any)[`Link${gameNumber}`];
  const gameLink =  {gameLinks, EnterPage : true};
  const customEvent = new CustomEvent('onEnter', { detail: gameLink});
  
  document.dispatchEvent(customEvent);
  // console.log(customEvent);
  

}