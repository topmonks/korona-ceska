# korona-ceska.cz
#CRA #PWA #boardgame.io #React

## Development
```
~/src/korona-ceska on master [$]
$ npm run
Lifecycle scripts included in korona-ceska:
  start
    node scripts/start.js
  test
    node scripts/test.js

available via `npm run-script`:
  build
    node scripts/build.js
  postbuild
    node scripts/modifyServiceWorker.js
  upload-images
    dotenv -e .env.local gulp
  analyze
    source-map-explorer 'build/static/js/*.js'
```

### Main Rule
Keep It Simple, Please! 

### Cloudinary upload

This site have ability to upload images to Cloudinary and generate Cloudinary URLs.
Cloudinary needs to be properly configured.
Go to [Cloudinary console](https://cloudinary.com/console) (credentials are in TopMonks 1password vault)
and copy the `Environment variable` with credentials. One time run this command:

```
pbpaste > .env.local
```

When configured you can re-upload images with:

```bash
npm run upload-images
```

