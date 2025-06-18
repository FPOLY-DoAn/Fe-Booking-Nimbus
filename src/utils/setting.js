import axios from 'axios'


// const baseURL = 'http://localhost:2615'
const ACESS_TOKEN = 'access_token'

const commonSettings = {
    setStorageJson: (name, data) => {
        data = JSON.stringify(data);
        localStorage.setItem(name, data);
    },

    setStorage: (name, data, ttl) => {
        const item = { value: data };

        if (ttl) {
            const now = new Date().getTime();
            item.expiry = now + ttl; // Chỉ thêm expiry khi ttl có giá trị
        }

        localStorage.setItem(name, JSON.stringify(item));
    },

    getStorage: (name = '') => {
        const itemStr = localStorage.getItem(name);
        if (!itemStr) {
            return null;
        }

        const item = JSON.parse(itemStr);
        const now = new Date().getTime();

        // Check if the item has expired
        if (item.expiry && now > item.expiry) {
            localStorage.removeItem(name);
            return null;
        }
        return item.value;
    },

    getStorageJson: (name) => {
        if (localStorage.getItem(name)) {
            const dataStore = localStorage.getItem(name);
            if (typeof dataStore === 'string') {
                const data = JSON.parse(dataStore);
                return data;
            }
            return undefined;
        }
        return undefined;
    },

    getStore: (name) => {
        if (localStorage.getItem(name)) {
            const data = localStorage.getItem(name);
            return data;
        }
        return undefined;
    },

    setCookieJson: (name, value, hours) => {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000); // Thời hạn hours giờ
        const expires = '; expires=' + date.toUTCString();
        document.cookie = `${name}=${JSON.stringify(value)}; path=/; SameSite=None; Secure${expires}`;
    },

    getCookieJson: (name) => {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    },

    setCookie: (name, value, hours) => {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000); // Thời hạn hours giờ
        const expires = '; expires=' + date.toUTCString();
        document.cookie = `${name}=${value}; path=/; SameSite=None; Secure${expires}`;
    },

    getCookie: (name) => {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    eraseCookie: (name) => {
        document.cookie =
            name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },

    clearStorage: () => {
        localStorage.clear();
    },

    clearCookies: () => {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            commonSettings.eraseCookie(name);
        }
    },
};

const httpClient = axios.create({
    baseURL: baseURL,
    timeout: 3000
})


httpClient.interceptors.request.use((request) => {
    const token = commonSettings.getStorage(ACESS_TOKEN)

    if (token) {
        request.headers = {
            ...request.headers,
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    } else {
        request.headers = {
            ...request.headers,
            'Accept': 'application/json',
        }
    }
});

httpClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error?.respone?.status === 400 || error?.respone?.status === 404) {
        alert('Not Found!')
    }

    if (error?.respone?.status === 401 || error?.respone?.status === 403) {
        alert('Meo du tuoi')
    }

    return Promise.reject(error)
});

export {
    baseURL,
    ACESS_TOKEN,
    commonSettings,
    httpClient
}