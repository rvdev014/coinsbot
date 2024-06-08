export interface ITgUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_premium: boolean;
    allows_write_to_pm: boolean;
}

export interface ITgDataUnsafe {
    query_id: string;
    user: ITgUser;
    auth_date: string;
    hash: string;
}

export interface IAppStore {
    webApp: any;
    isAppLoading: boolean;
    initTelegram: () => void;
}