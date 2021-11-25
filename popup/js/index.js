var fieldsOk = {"URL": false, "login": false, "password": false}
var _lemmyCreds;
var lemmyJwt;
const storage = getBrowserStorage();

function getBrowserStorage() {
    if (browser) {
        return browser.storage.sync;
    } else return chrome.storage.sync;
}


function getBrowser() {
    if (browser) {
        return browser;
    } else return chrome;
}

const cross_browser = getBrowser();


$('#buttonPreview').on('click', function () {
    var text = document.getElementById('postText').value,
    converter = new showdown.Converter(),
    html = converter.makeHtml(text);
    $('#previewModal').children('.modal-content').html(html);
    $('#previewModal').addClass('is-active');
})

$('button#modal-close').on('click', function () {
    $('#previewModal').removeClass('is-active');
})


function registerInfo (lemmy, counter, mFieldsOK) {
    if (mFieldsOK.URL && mFieldsOK.login && mFieldsOK.password) {
        storage.set({'lemmyURL': lemmy.URL});
        storage.set({'lemmyLogin': lemmy.login});
        storage.set({'lemmyPassword': lemmy.password});
        init()
    } else if (counter < 300) setTimeout(registerInfo, 200, lemmy, counter+1, mFieldsOK);
}

function getLemmyInfo() {
    $('form#initForm').removeClass('hidden')
    $('div#defaultPage').addClass('hidden')
    $('#inputPasswordToggle').on('click', () => {
        if ($('#inputPassword').attr('type') === 'password')
            $('#inputPassword').attr('type', 'text')
        else $('#inputPassword').attr('type', 'password') 
    })
    $('#submitButton').on('click', () => {
        $('#urlEmpty').addClass('hidden')
        $('#loginEmpty').addClass('hidden')
        $('#passwordEmpty').addClass('hidden')
        $('#urlNoMatch').addClass('hidden')
        $('#passwordOrEmailInvalid').addClass('hidden')
        const formData = {
            "URL": $('input#inputUrl').val(),
            "login": $('input#inputUsername').val(),
            "password": $('input#inputPassword').val(),
        }
        var matches;
        if (formData.URL) {
            matches = formData.URL.match(/^https?:\/\/[a-z0-9.\-\/]+$/)
            if (matches != null) {
                if (matches[0].length === formData.URL.length) {
                    if (!formData.URL.endsWith('/'))
                        formData.URL += '/'
                    fieldsOk.URL = true;
                } else {
                    $('#urlNoMatch').removeClass('hidden')
                }
            } else {
                $('#urlNoMatch').removeClass('hidden')
            }
        } else {
            $('#urlEmpty').removeClass('hidden')
        }
        if (formData.login)
            fieldsOk.login = true;
        else {
            $('#loginEmpty').removeClass('hidden')
        }
        if (formData.password)
            fieldsOk.password = true;
        else {
            $('#passwordEmpty').removeClass('hidden')
        }
        axios({
            method: 'POST',
            url: formData.URL+'api/v3/user/login',
            data: {"username_or_email": formData.login, "password": formData.password},
        }).then(function(response) {
            lemmyJwt = response.data.jwt;
            $('form#initForm').addClass('hidden')
            $('div#defaultPage').removeClass('hidden');
            registerInfo(formData, 0, fieldsOk);
            runtime(formData)
        }).catch((err) => {
            console.log(err)
            $('#passwordOrEmailInvalid').removeClass('hidden')
        })
    });
}

function GetCommunities(lemmyCreds) {
    var field = document.createElement('div')
    field.id = 'divCommunitySelector'
    field.className = "field has-addons my-4 select-field is-primary";
    var wrapper = document.createElement('div')
    wrapper.className = 'control is-expanded';
    var selector = document.createElement('div')
    selector.className = 'select is-fullwidth';
    var slect =  document.createElement('select')
    slect.id = 'communitySelector';
    slect.className = 'is-primary';
    slect.setAttribute('name', 'Categories')
    selector.appendChild(slect);
    wrapper.appendChild(selector);
    field.appendChild(wrapper);
    var button = document.createElement('div');
    button.className = 'control';
    button.innerHTML = '<button id="mainButton" class="button button-post"></button>';
    field.appendChild(button);
    if (document.getElementById('selectPlace') !== null)
        document.getElementById('selectPlace').replaceWith(field);
    else document.getElementById('divCommunitySelector').replaceWith(field);
    var tmp;
    if (lemmyCreds.URL && lemmyCreds.URL.lemmyURL) {
        axios({
            method: 'GET',
            params: {"q": "main", "type_": "Communities", "sort": "Hot", "auth": lemmyJwt},
            url: lemmyCreds.URL.lemmyURL+'api/v3/search'
        }).then((resp) => {
            tmp = document.createElement('option')
            tmp.setAttribute('value', resp.data.communities[0].community.id)
            tmp.innerText = `!${resp.data.communities[0].community.name} | ${resp.data.communities[0].community.title}`;
            document.getElementById('communitySelector').appendChild(tmp)
            axios({
                method: 'GET',
                params: {"sort": "Hot", "type_": "All", "auth": lemmyJwt},
                url: lemmyCreds.URL.lemmyURL+'api/v3/community/list'
            }).then((response) => {
                response.data.communities.forEach((cmObj) => {
                    tmp = document.createElement('option')
                    tmp.setAttribute('value', cmObj.community.id)
                    tmp.innerText = `!${cmObj.community.name} | ${cmObj.community.title}`;
                    document.getElementById('communitySelector').appendChild(tmp)
                })
            }).catch((err) => {console.log(err);});
        }).catch((err) => {console.log(err);});
    }
}

function getPost() {
    cross_browser.tabs.executeScript(cross_browser.tabs.getCurrent().id, {
        code: `var text;
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        } else text = '';
        var res = {url: window.location.href, title: document.title, text: text}; res;`}).then((result) => {
            if (result[0]) {
                $('#postUrl').val(result[0].url)
                $('#postTitle').val(result[0].title)
                $('#postText').val(result[0].text)
            }
        }, (err) => {console.log(err)});
}

function runtime(lemmyCreds) {
    $('#lemmyInfoDropdown').show();
    _lemmyCreds = lemmyCreds
    GetCommunities(lemmyCreds);
    getPost();
    $('button#mainButton').on('click', () => {
        if ($('button#mainButton').css('background-image') !== 'none')
            createPost(lemmyCreds)
    });
}

function createPost(lemmyCreds) {
    if (!$('div#linkPosted').hasClass('hidden')) $('div#linkPosted').addClass('hidden');
    if (!$('p#urlEmpty').hasClass('hidden')) $('p#urlEmpty').addClass('hidden');
    if (!$('p#titleEmpty').hasClass('hidden')) $('p#titleEmpty').addClass('hidden');
    if (!$('p#urlInvalid').hasClass('hidden')) $('p#urlInvalid').addClass('hidden');
    $('button#mainButton').addClass('is-loading');
    $('button#mainButton').css('background-image', 'none');
    console.log('Posting...')
    const title = $('input#postTitle').val();
    const community = $('#communitySelector').val()
    const url = $('input#postUrl').val()
    if (title && url) {
            const body = {"name": title, "url": url, "body": $('#postText').val(), "nsfw": false, community_id: parseInt(community), auth: lemmyJwt}
            axios({
                method: 'POST',
                url: lemmyCreds.URL.lemmyURL+'api/v3/post',
                data: body,
            }).then((response) => {
                if(response.status === 200) {
                    $('button#mainButton').removeClass('is-loading');
                    $('button#mainButton').html('<i class="has-text-success" data-feather="check"></i>')
                    feather.replace()
                    console.log('New post successfully posted, opening the post webpage.', lemmyCreds.URL.lemmyURL+`post/${response.data.post_view.post.id}`);
                } else console.log('error when trying to post')
            }).catch((err) => {console.log(err)})
    } else {
    $('button#mainButton').removeClass('is-loading');
    $('button#mainButton').css('background-image', "url('img/lemmy.svg')");
        if (!title)
            $('p#titleEmpty').removeClass('hidden')
        if (!url) $('p#urlEmpty').removeClass('hidden')
    }
}

$('#linkPosted').children('a').on('click', function (e) {
    if (postLink && navigator.userAgent.includes('Chrome/')) {
        e.preventDefault()
        cross_browser.tabs.create({url: postLink})
    }
});

async function init() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme) {
        $('#stylesheetTheme').attr('href', 'styles.dark.min.css')
        document.getElementById('dropCredsSubmit').className = document.getElementById('dropCredsSubmit').className.replace(' is-light ', ' is-dark ')
        document.getElementById('dropdownBtn').className = document.getElementById('dropCredsSubmit').className.replace(' is-light ', ' is-dark ')
    }
    var lemmyCreds = {"URL": '', "login": '', "password": ''}
    storage.get('lemmyURL').then((url) => {
        lemmyCreds.URL = url;
        if (typeof(lemmyCreds.URL.lemmyURL) === 'string' && lemmyCreds.URL.lemmyURL) {
            storage.get('lemmyLogin').then((login) => {
                lemmyCreds.login = login;
                if (typeof(lemmyCreds.login.lemmyLogin) === 'string' && lemmyCreds.login.lemmyLogin) {
                    storage.get('lemmyPassword').then((password) => {
                        lemmyCreds.password = password;
                        if (typeof(lemmyCreds.password.lemmyPassword) === 'string' && lemmyCreds.password.lemmyPassword) {
                            axios({
                                method: 'POST',
                                url: lemmyCreds.URL.lemmyURL+'api/v3/user/login',
                                data: {"username_or_email": lemmyCreds.login.lemmyLogin, "password": lemmyCreds.password.lemmyPassword},
                            }).then(function(response) {
                                lemmyJwt = response.data.jwt;
                                  runtime(lemmyCreds)
                            }).catch((err) => {console.log(err)})
                        } else getLemmyInfo()
                            
                    })
                } else getLemmyInfo()
            });
        } else getLemmyInfo()
    });
}

init()


/*
https://share.niceopensource.org/
Loys
Alta*r667!!
*/