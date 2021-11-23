# :mouse: POST to lemmy
A cross-browser extension to post links to your Lemmy instance.
For now it is still in development.

# :hammer_and_wrench: Installation

## :fox_face: On Mozilla Firefox
:file_folder: Download the last release of the [packaged extension](https://github.com/NiceOpenSource/posttolemmy/releases/latest) for Firefox (.xpi)
if you use a recent version of Firefox, the package will install itself otherwise follow the instructions below

1. :cog: Go to ``about:addons`` page and click on the cog at the top right corner of the document
2. :heavy_plus_sign: Click ``Install a module from a file``
3. :open_file_folder: Select the previously downloaded extension package (.xpi)
4. :mouse: Open the extension using the icon at the top-right corner of your browser window and input the login intels to your Lemmy instance


## On Google Chrome :large_blue_circle: :green_circle: :yellow_circle: :red_circle:
1. :file_folder: Download the last release of the [packaged extension](https://github.com/NiceOpenSource/posttolemmy/releases/latest) for Chrome (.crx)
2. 🧩 Open the ``chrome://extensions/`` page in Chrome browser
3. :open_file_folder:  Drag and drop the .crx into the browser window
4. :hammer_and_wrench: Click on the puzzle to pin the add-on to the extension toolbar 
5. :mouse: Open the extension using the icon at the top-right corner of your browser window and input the login intels to your Lemmy instance

## Rolling release / development mode
See [wiki](https://github.com/NiceOpenSource/posttolemmy/wiki/Rolling-release-installation)

:warning: Your lemmy instance shall use the v3 version of the Lemmy HTTP API (Lemmy version >= 0.10.0) to work with the extension.

You can see the lemmy version in the footer of any lemmy website.

# Use
1. :globe_with_meridians: Go to any web page 
2. :abc: Select the part of it's content that you want to share 
3. 🧩 Open the extension 
4. :pencil2: Edit the text and the title to match your needs 
5. :envelope: POST ! 

# Features
- [x] Auto-filling fields
- [x] Select content on the page to add it to the post text
- [x] Auto-customizing popup based on your lemmy instance
- [x] Markdown editor for post content
- [x] Markdown pre-viewer
- [x] Register several different instances of Lemmy


# Contributions
* Developer : [Loys Caucheteux](https://cv.loys.me), [EPITECH](https://github.com/Epitech) student and Intership trainee at [PG3](https://github.com/pg3io). [GitHub](https://github.com/gummyWalrus) / [Linkedin](https://www.linkedin.com/in/loys-caucheteux-a99655205/)
* UI Designer : Jeanne Sala, [Linkedin](https://www.linkedin.com/in/jeanne-sala-846a55208/)
* [ShowdownJS](https://github.com/showdownjs/showdown)
* [Mozilla firefox](https://developer.mozilla.org/fr/firefox)
* [Lemmy](https://join-lemmy.org)
* [Axios](https://www.npmjs.com/package/axios)
* Style librairies : [Bulma](https://bulma.io/), [Jquery](https://jquery.com/), [Font Awesome](https://www.fontawesome.com)
