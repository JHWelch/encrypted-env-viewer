# Encrypted Env Viewer for Laravel

View encrypted .env files directly in GitHub pull requests.

## Build for Release

Both build commands will generate production ready code in the `dist` folder 
and generate a release.zip file in the root of the project for upload.

### Chrome
```bash
npm run build
```

### Firefox
```bash
npm run build:firefox
```

## Local Development 

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

### Other Available Commands

| Commands             | Description                  |
| -------------------- | ---------------------------- |
| `npm run clean`      | remove temporary files       |
| `npm run test`       | run unit tests               |
| `npm run test:watch` | run unit tests in watch mode |
| `npm run lint`       | lint source code             |
| `npm run fix`        | fix lint errors              |

## Thanks

This extension was created with [Extension CLI](https://oss.mobilefirst.me/extension-cli/)
