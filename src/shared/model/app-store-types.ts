export interface IAppStore {
    webApp: any;
    isAppLoading: boolean;
    initTelegram: () => void;
}

export interface ITgDataUnsafe {
    user: ITgUser;
    chat_instance: string;
    chat_type: string;
    start_param: string;
    auth_date: string;
    hash: string;
}

export interface ITgUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_premium: boolean;
    allows_write_to_pm: boolean;
}