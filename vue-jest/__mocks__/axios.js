export default {
    get(url) {
        return new Promise(resolve => {
            if (url === "/list") {
                resolve([12, 3, 4, 5]);
            }
        });
    }
};
