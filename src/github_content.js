const CryptoJS = require("crypto-js");
const Diff = require('diff');
const Diff2html = require('diff2html');

function initEnvViewer() {
    let divs = document.querySelectorAll('div[data-file-type=".encrypted"][data-details-container-group="file"]');

    divs.forEach(addDecryptButton);
}

function addDecryptButton(a) {
    let button = document.createElement('button');
    button.innerText = 'Decrypt';
    button.setAttribute('data-find-me', 'something')

    button.addEventListener('click', () => {
        const left = a.querySelector('[data-split-side="left"]');
        const right = a.querySelector('[data-split-side="right"]');

        if (!left || !right) {
            return;
        }

        const leftData = left.children[0].getAttribute('data-original-line').substring(1)
        const rightData = right.children[0].getAttribute('data-original-line').substring(1)

        const key = prompt('Enter encryption key')

        Promise.all([
            decryptEnv(leftData, key),
            decryptEnv(rightData, key),
        ]).then(([leftDecrypted, rightDecrypted]) => {
            const diff = Diff.createPatch('patch', leftDecrypted, rightDecrypted);
            const html = Diff2html.html(diff, { drawFileList: false, matching: 'lines' });
            a.innerHTML = html;
        })
    });

    a.children[0].appendChild(button);
}

function addLocationObserver(callback) {
    const config = { attributes: false, childList: true, subtree: false }

    const observer = new MutationObserver(callback)

    observer.observe(document.body, config)
}

function observerCallback() {
    if (window.location.href.startsWith('https://github.com')) {
        // Has to wait for page load
        sleep(1000).then(initEnvViewer);
    }
}

async function decryptEnv(fullFile, key) {
    if (key.startsWith('base64:')) {
        key = key.substring(7);
    }

    const fileObject = await JSON.parse(atob(fullFile));

    const parsedKey = CryptoJS.enc.Base64.parse(key);
    const iv  = CryptoJS.enc.Base64.parse(fileObject.iv);

    const decryptedWA = CryptoJS.AES.decrypt(fileObject.value, parsedKey, { iv: iv});

    return trimEnv(decryptedWA.toString(CryptoJS.enc.Utf8));
}

function trimEnv(env) {
    return env.match(/s:\d+:"([\s\S]*)";/)[1];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

addLocationObserver(observerCallback)
observerCallback()
