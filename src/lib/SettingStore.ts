class SettingStore {
    has(name: string) {
        return this.get(name) !== null;
    }

    set(name: string, value: any) {
        return localStorage.setItem(name, value);
    }

    get(name: string) {
        return localStorage.getItem(name);
    }

    delete(name: string) {
        return localStorage.removeItem(name);
    }
}

export default SettingStore;
