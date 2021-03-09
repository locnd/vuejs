import pako from 'pako';

export default {
    saveItem(key, value) {
        const binaryString = pako.deflate(JSON.stringify(value), {to: 'string'});
        window.localStorage.setItem(key, binaryString);
    },
    getItem(key) {
        const zipData = window.localStorage.getItem(key);
        if (!zipData) {
            return zipData;
        }

        return JSON.parse(pako.inflate(zipData, { to: 'string' }));
    },
    removeItem(key) {
        window.localStorage.removeItem(key);
    },
};