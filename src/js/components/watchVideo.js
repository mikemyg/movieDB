const youtube = 'https://www.youtube.com/embed/';

export const renderVideo = (videoId, parent) => {
    const video = `</div><div id="video${parent}" class="video-container"><iframe class="iframe" src="${youtube}${videoId}?html5"></iframe></div>`;
    let target = document.getElementById(`${parent}`)
    target.insertAdjacentHTML('afterend', video);
};

export const clearVideo = (parent) => {
    parent.parentElement.removeChild(parent);
};