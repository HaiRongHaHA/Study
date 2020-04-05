export const getDataThroughPromise = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ name: "hrpgn" });
        }, 1000);
    });
};

export const getDataThroughCallback = callback => {
    setTimeout(() => {
        callback(123);
    }, 1000);
};
