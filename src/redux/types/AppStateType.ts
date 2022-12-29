import { AuthStateType } from "./";
import { ScreenType } from "./";
import { ScreenInfo } from "./screenTypes";

export type AppStateType = {
    auth: AuthStateType,
    screen: ScreenInfo,
};