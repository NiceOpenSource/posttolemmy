# POST to lemmy :mouse:

A browser extension to post links to your Lemmy instance.
For now it is still in development and is only available on Firefox.

# Installation (Firefox)
1. Download the last release of the [packaged extension](https://github.com/NiceOpenSource/posttolemmy/releases/latest) :file_folder:
2. Go to ```about:debugging``` page on Firefox browser :bug:
3. In the sidebar, go to ```this Firefox``` section and click on ```Load temporary Add-on``` :heavy_plus_sign:
4. Select the extension package :open_file_folder:
5. Open the extension using the icon at the top left corner of your browser window and input the login intels to your Lemmy instance :mouse:

> Your lemmy instance shall use the v3 version of the Lemmy HTTP API (Lemmy version >= 0.10.0)

# Use
1. Go to any web page
2. Select the part of it's content that you want to share
3. Open the extension
4. Edit the text and the title to match your needs
5. POST ! :envelope:

# Features
- [x] Auto-filling fields
- [x] Select content on the page to add it to the post text
- [x] Dark theme (beta)
- [x] Auto-customizing popup based on your lemmy instance
- [x] Markdown editor for post content
- [x] Markdown pre-viewer

## Incoming
- [ ] Register several different instances of Lemmy
- [ ] POST to several Lemmy(s) at the same time


# Ehance POST to lemmy (Firefox)
*  [Install the extension in development](https://github.com/NiceOpenSource/posttolemmy/wiki/Install-in-development-on-Mozilla-Firefox)
* The sources are immediatly editables and development mode reloads the extension after each modification, no need to click the 'Reload' button in 'about:debugging'
* To build the .zip/.xpi file use the web-ext npm package.
```bash
npm i -g web-ext
```
* Code your contributions then :
```bash
web-ext build
```

# Contributions
* Developer : [Loys Caucheteux](https://cv.loys.me), [EPITECH](https://github.com/Epitech) student and Intership trainee at [PG3](https://github.com/pg3io). [GitHub](https://github.com/gummyWalrus) / [Linkedin](https://www.linkedin.com/in/loys-caucheteux-a99655205/)
* UI Designer : Jeanne Sala, [Linkedin](https://www.linkedin.com/in/jeanne-sala-846a55208/)
* [DownArea](https://github.com/fatihege/downarea) by [FatiHege](https://github.com/fatihege)
* [ShowdownJS](https://github.com/showdownjs/showdown)
* [Mozilla firefox](https://developer.mozilla.org/fr/firefox)
* [Lemmy](https://join-lemmy.org)
* [Bulma](https://bulma.io/)
* [Jquery](https://jquery.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [Font Awesome](https://www.fontawesome.com)
