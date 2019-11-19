export const renderLoader = parent => {
    if (parent.children.length === 0){
        const loader = `<div class="loader"></div>`;
        parent.insertAdjacentHTML('afterbegin', loader);
    }
};

export const clearLoader = () => {
    const loader = document.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader);
};