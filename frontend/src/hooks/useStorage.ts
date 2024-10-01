import { Storage } from '@ionic/storage';
import { useEffect, useState } from "react";

const SETTINGS_KEY: string = "settings";

export interface Settings {
    queriesTotal: number
    cutOff: number
    isDarkModeEnabled: boolean
}

export function useStorage() {

    const [store, setStore] = useState<Storage>();
    const [settings, setSettings] = useState<Settings>();

    useEffect(() => {
        const initStorage = async () => {
            const newStorage: Storage = new Storage({
                name: "store"
            });
            const store = await newStorage.create();
            setStore(store);
            const storedSettings: Settings = await store.get(SETTINGS_KEY) ?? {
                queriesTotal: 3,
                cutOff: 0,
                isDarkModeEnabled: false
            };
            setSettings(storedSettings);
        }
        initStorage();
    }, []);

    const updateSettings = async (queriesTotal: number, cutOff: number, isDarkModeEnabled: boolean): Promise<void> => {
        let newSettings: Settings = {
            queriesTotal: queriesTotal,
            cutOff: cutOff,
            isDarkModeEnabled: isDarkModeEnabled
        }
        await store?.set(SETTINGS_KEY, newSettings);
    }

    const loadSettings = async () => {
        let s: Settings = await store?.get(SETTINGS_KEY);
        return s;
    }

    return {
        settings,
        updateSettings,
        loadSettings
    }
}