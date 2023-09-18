# Encrypted Env Viewer for Laravel

<p align="center">
  <a href="https://chrome.google.com/webstore/detail/encrypted-env-viewer-for/iicfhfioneghfihofndkpadnpadakaid">
    <picture>
      <source srcset="https://i.imgur.com/XBIE9pk.png" media="(prefers-color-scheme: dark)">
      <img height="58" src="https://i.imgur.com/oGxig2F.png" alt="Chrome Web Store">
    </picture>
  </a>

  <a href="https://addons.mozilla.org/en-US/firefox/addon/encrypted-env-viewer">
    <picture>
      <source srcset="https://i.imgur.com/ZluoP7T.png" media="(prefers-color-scheme: dark)">
      <img height="58" src="https://i.imgur.com/4PobQqE.png" alt="Firefox add-ons">
    </picture>
  </a>
</p>

View [Laravel Encrypted .env files](https://blog.laravel.com/laravel-new-environment-encryption-commands) directly in GitHub pull requests.

## Manually Build for Release

Both build commands will generate production ready code in the `dist` folder 
and generate a `release.zip` file in the root of the project for upload.

### Chrome
```bash
npm run build
```

### Firefox
```bash
npm run build:firefox
```

## Local Development (Chrome)

### Code Setup

```bash
npm install
npm run start
```

This will watch for file changes and rebuild the extension. 

### Browser Setup

1. Open `about://extensions` in Chromium based browser.
2. Check the Developer mode checkbox in the upper right.
3. Click on the Load unpacked extension button.
4. Select the `dist` folder.

You will need to press the "Update" button on the extension when you make changes to the code. Or you can use the [Extension Reloader](https://chromewebstore.google.com/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) extension to make this easier.

## Local Development (Firefox)

### Code Setup

```bash
npm install
npm run start:firefox
```

This will watch for file changes and rebuild the extension.

### Browser Setup

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click on the Load Temporary Add-on... button.
3. Select the `dist` folder.
4. Select the `manifest.json` file.

You will need to press the "Reload" button on the extension when you make changes to the code.

## Other Available Commands

| Commands             | Description                  |
| -------------------- | ---------------------------- |
| `npm run clean`      | remove temporary files       |
| `npm run test`       | run unit tests               |
| `npm run test:watch` | run unit tests in watch mode |
| `npm run lint`       | lint source code             |
| `npm run fix`        | fix lint errors              |

## Thanks

This extension was created with [Extension CLI](https://oss.mobilefirst.me/extension-cli/)
