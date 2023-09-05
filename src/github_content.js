const CryptoJS = require("crypto-js");
const Diff = require('diff');
const Diff2html = require('diff2html');

function initEnvViewer() {
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
    let button = document.createElement('button');
    button.innerText = 'Decrypt';
    a.children[0].appendChild(button);

    button.addEventListener('click', () => {
        const left = a.querySelector('[data-split-side="left"]');
        const right = a.querySelector('[data-split-side="right"]');

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
}

function addLocationObserver(callback) {
    const config = { attributes: false, childList: true, subtree: false }

    const observer = new MutationObserver(callback)

    observer.observe(document.body, config)
}

function observerCallback() {
    if (window.location.href.startsWith('https://github.com')) {
        initEnvViewer()
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

addLocationObserver(observerCallback)
observerCallback()
