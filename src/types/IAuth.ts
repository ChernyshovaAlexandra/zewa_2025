
export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    username: string
}

export type GameData = {
    id: number,
    type: number,
    name: string,
    cost: number,
    max_points: number
}

export type LoggedUser = {
    coins: number,
    points: number,
    new_coupons: Array<any>,
    this_period_new_coupons: Array<any>,
    activated_coupons: Array<any>,
    this_period_activated_coupons: Array<any>,
    prizes: Array<PrizeProps>
}
export type PrizeProps = {
    name: string;
    description?: string;
    points: number;
    type?: string;
    activated?: boolean;
    disabled?: boolean;
    new?: boolean;
    code?: string
}
type UserCanPlay = {
    [key: number]: boolean;
};

export interface LoggedUserData {
    user: LoggedUser,
    games: Array<GameData>,
    user_can_play: UserCanPlay,
    prizes: PrizeProps[];
    coupons: PrizeProps[];
    game_day: number
}


export interface AuthContextProps {
    updateUserData: (newData: Partial<LoggedUserData>) => void;
    userData: LoggedUserData | null;
    setUserData: (data: LoggedUserData | null) => void;
    prizes?: PrizeProps[];
    vkUserData: UserData | null;
    showLoader: boolean;
    setPermission: React.Dispatch<React.SetStateAction<boolean>>
    permissionGranted: boolean;
    tooltip: boolean;
    TelegramLogin: () => void;
    setTooltip: React.Dispatch<React.SetStateAction<boolean>>;
    setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
    authData: any;
}
