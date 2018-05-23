class SettingsStore {
    set(name, value) {
        return localStorage.setItem(name, value);
    }

    get(name, value) {
        return localStorage.getItem(name);
    }

    delete(name) {
        return localStorage.removeItem(name);
    }
}

export default SettingsStore;
