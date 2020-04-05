const listener = (e, el, bindings) => {
    if (e.target === el || el.contains(e.target)) return;
    bindings.value();
};

export const clickOutside = {
    inserted(el, bindings) {
        document.addEventListener("click", e => listener(e, el, bindings));
    },
    unbind(el, bindings) {
        document.removeEventListener("click", e => listener(e, el, bindings));
    }
};
