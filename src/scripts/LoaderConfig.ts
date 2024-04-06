import { Background } from './Background';
export const LoaderConfig = {
    Frame : require("../sprites/SlotFrame.png"),
    Slot0 : require("../sprites/Slot1.png"),
    Slot1 : require("../sprites/Slot2.png"),
    Slot2 : require("../sprites/Slot3.png"),
    Slot3 : require("../sprites/Slot4.png"),
    loginPage : require("../sprites/LoginPage.png"),
    loginBtn : require("../sprites/LoginBtn.png"),
    InputField : require("../sprites/InputField.png"),
    uiSetup : require("../sprites/UI Setup.png"),
    settingBtn : require("../sprites/settingBtn.png"),
    logo : require("../sprites/Logo.png"),
    avUi : require("../sprites/AvtarUI.png"),

    Bingo : require("../sprites/Bingo.png"),
    Casino : require("../sprites/Casino.png"),
    Fish : require("../sprites/Fish.png"),
    Jackpot : require("../sprites/Jackpot.png"),
    SpinWheel : require("../sprites/Spin Wheel.png"),
    Slot: require("../sprites/Slot.png"),

    favHolder : require("../sprites/FavHolder.png"),
    favHolder1 : require("../sprites/FavHolder1.png"),

    isFav : require("../sprites/FavHolder3.png"),
    isNotFav : require("../sprites/FavHolder2.png"),

    switcherOn : require("../sprites/SwitchOn.png"),
    switcherOff : require("../sprites/SwitchOff.png"),
    
    Arrow : require("../sprites/Arrow.png"),

    upperLFrame  : require("../sprites/upperLFrame.png"),
    upperRFrame  : require("../sprites/upperRFrame.png"),
    bottomLFrame  : require("../sprites/bottomL.png"),
    bottomRFrame  : require("../sprites/bottomR.png"),
    BottmFrame : require("../sprites/BottmFrame.png"),
    upperFrame : require("../sprites/upperFrame.png"),
    UpperMiddleFrame : require("../sprites/UpperMIddleFrame.png"),
    BottmMiddle: require("../sprites/BottmMiddle.png"),

    HOT : require("../sprites/Hot.png"),
    NEW : require("../sprites/New.png"),



};

export const staticData = {
    // logoURL: "https://cccdn.b-cdn.net/1584464368856.png",
    logoURL: require("/static/Logo.png").default,
    Background: require("/static/Background.png").default,
};

export const fontData = ["Inter"];



export const LoaderSoundConfig: any = {
onSpin : require("../sounds/onStartCoin.mp3"),
};

export const preloaderConfig = {
    // startLogo: require("../sprites/Logo.png")
}