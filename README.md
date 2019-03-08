### Kindle Highlight Browser

---

Browse the contents of your Kindle's "My Clippings.txt" file.

The notes and highlights on your Kindle are stored in a "My Clippings.txt" file. Unfortunately this file can be hard to parse.

Versions available for Windows and Mac OS.

### Features

---

-   Easily navigate and through your notes
    -   Browse by Title and Author
    -   Filter by Title and Author
    -   Select multiple for export
    -   Sort by location or date
-   Export your highlights and notes
    -   Save your notes directly to a file
    -   Copy your notes to the clipboard

### Development Notes

---

To run the electron app directly from the command line:

```sh
$ npm run dev
```

To compile the react code:

```sh
$ npm run compile:react
```

To build all of the electron apps:

```sh
$ gulp build
```

To build a single electron app:

```sh
$ gulp package:linux:x64
$ gulp package:win32:x64
$ gulp package:darwin:x64
```

#### React Devtools

The package electron-react-devtools is already installed in the packages.json

Run the following in the dev console after you `npm run dev`:

```
require('electron-react-devtools').install()
```

### Electron Packaging Instructions

---

Windows

```sh
$ npm run pack:win
```

Mac OS X

```sh
$ npm run pack:osx
```

### Packaging Notes

---

electron-packager usage-notes and options can be found at:
https://github.com/electron-userland/electron-packager/blob/master/usage.txt

### Icon Notes

The icon was made by [BlackVariant](http://blackvariant.deviantart.com/), downloaded from [iconarchive.com](http://www.iconarchive.com/show/button-ui-requests-15-icons-by-blackvariant/Amazon-Kindle-icon.html).

### License

MIT
