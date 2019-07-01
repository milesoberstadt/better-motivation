if (window.location.hostname === 'www.linkedin.com') {
    let originalVideos = [];
    let restoredVideos = [];
    setInterval(() => {
        const elements = document.querySelectorAll('.feed-shared-linkedin-video');
        for (let e of elements) {
            if (restoredVideos.includes(e))
                continue;
            originalVideos.push(e);
            const replacement = htmlToElement(`<div class="replacement-video" ><iframe width="552" height="548" src="//www.youtube.com/embed/ZXsQAXx_ao0" frameborder="0" allowfullscreen></iframe><a href="#" class="restore-video-link" data-restore-index="${originalVideos.length - 1}">Show original video</a></div>`)
            e.parentNode.replaceChild(replacement, e);
        }
        const links = document.querySelectorAll('.restore-video-link');
        for (let link of links){
            link.addEventListener("click", restoreVideo);
        }
    }, 2000);
    
    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    function restoreVideo(event) {
        console.log('restoreVideo called', event.target);
        const origVideo = originalVideos[event.target.dataset.restoreIndex];
        restoredVideos.push(origVideo);
        // For some reason, replacing this child messes with our scroll position...
        let scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        event.target.parentNode.parentNode.replaceChild(origVideo, event.target.parentNode);
        setTimeout((() => document.documentElement.scrollTop = document.body.scrollTop = scrollPos), 200);
    }
}