class SettingStore {
    has(name) {
        return this.get(name) !== null;
    }

    set(name, value) {
        return localStorage.setItem(name, value);
    }

    get(name) {
        return localStorage.getItem(name);
    }

    delete(name) {
        return localStorage.removeItem(name);
    }
}

export default SettingStore;
