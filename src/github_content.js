function initEnvViewer() {
    console.log('initted')
    let divs = document.querySelectorAll('div[data-file-type=".encrypted"]');

    if (divs.length <= 0) {
        return;
    }

    if (divs.length % 2 !== 0) {
        console.error('Found an odd number of encrypted files. Something is wrong.');
        return;
    }

    for (let i = 0; i < divs.length; i += 2) {
        processEncryptedFileDivs(divs[i], divs[i + 1]);
    }
}

function processEncryptedFileDivs(a, b) {
    console.log('processing', a, b)

    let button = document.createElement('button');
    button.innerText = 'Decrypt';
    a.children[0].appendChild(button);

    button.addEventListener('click', () => {
        const left = a.querySelector('[data-split-side="left"]');
        const right = a.querySelector('[data-split-side="right"]');

        console.log('left', left.children[0].getAttribute('data-original-line'))
        console.log('right', right.children[0].getAttribute('data-original-line'))
    });
}

function addLocationObserver(callback) {
    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: false }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback)

    // Start observing the target node for configured mutations
    observer.observe(document.body, config)
}

function observerCallback() {
    if (window.location.href.startsWith('https://github.com')) {
        initEnvViewer()
    }
}

addLocationObserver(observerCallback)
observerCallback()
