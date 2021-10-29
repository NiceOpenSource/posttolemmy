var fieldsOk = {"URL": false, "login": false, "password": false}
var _lemmyCreds;
var lemmyJwt;


function registerInfo(lemmy, counter) {
    if (fieldsOk.URL && fieldsOk.login && fieldsOk.password) {
        browser.storage.sync.set({'lemmyURL': lemmy.URL});
        browser.storage.sync.set({'lemmyLogin': lemmy.login});
        browser.storage.sync.set({'lemmyPassword': lemmy.password});
        init()
    } else if (counter < 300) setTimeout(registerInfo, 200, lemmy, counter+1);
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
            registerInfo(formData, 0);
            runtime(lemmyCreds)
        }).catch((err) => {
            console.log(err)
            $('#passwordOrEmailInvalid').removeClass('hidden')
        })
    });
}

function GetCommunities(lemmyCreds) {
    var field = document.createElement('div')
    field.className = "field has-addons my-4 select-field is-primary";
    var wrapper = document.createElement('div')
    wrapper.className = 'control';
    var selector = document.createElement('div')
    selector.className = 'select';
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
    document.getElementById('postText').after(field);
    var tmp;
    axios({
        method: 'GET',
        params: {"sort": "New", "type_": "All", "auth": lemmyJwt},
        url: lemmyCreds.URL.lemmyURL+'api/v3/community/list'
    }).then((response) => {
        response.data.communities.forEach((cmObj) => {
            tmp = document.createElement('option')
            tmp.setAttribute('value', cmObj.community.id)
            tmp.innerHTML = cmObj.community.title;
            document.getElementById('communitySelector').appendChild(tmp)
        })
    }).catch((err) => {console.log(err);});
}

function getPost() {
    browser.tabs.executeScript(browser.tabs.getCurrent().id, {
        code: `var text;
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        } else text = '';
        var res = {url: window.location.href, title: document.title, text: text}; res;`}).then((result) => {
            $('#postUrl').val(result[0].url)
            $('#postTitle').val(result[0].title)
            $('#postText').val(result[0].text)
        }, (err) => {console.log(err)});
}

function runtime(lemmyCreds) {
    $('#lemmyInfoDropdown').show();
    _lemmyCreds = lemmyCreds
    GetCommunities(lemmyCreds);
    getPost();
    $('button#mainButton').on('click', () => {
        createPost(lemmyCreds)
    });
}

function createPost(lemmyCreds) {
    $('button#mainButton').addClass('is-loading');
    $('button#mainButton').css('background-image', 'none');
    const community = $('#communitySelector').val()
    const body = {"name": $('input#postTitle').val(), "url": $('input#postUrl').val(), "body": $('#postText').val(), "nsfw": false, community_id: parseInt(community), auth: lemmyJwt}
    axios({
        method: 'POST',
        url: lemmyCreds.URL.lemmyURL+'api/v3/post',
        data: body,
    }).then((response) => {
        if(response.status === 200) 
        {
            $('button#mainButton').removeClass('is-loading');
            $('button#mainButton').css('background-image', "url('img/lemmy.svg')");
            console.log('New post successfully posted, opening the post webpage.', lemmyCreds.URL.lemmyURL+`post/${response.data.post_view.post.id}`)
            browser.tabs.create({url: lemmyCreds.URL.lemmyURL+`post/${response.data.post_view.post.id}`})
        } else console.log('error when trying to post')
    }).catch((err) => {console.log(err)})
}

async function init() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme) {
        $('#stylesheetTheme').attr('href', 'styles.dark.css')
        document.getElementById('dropCredsSubmit').className = document.getElementById('dropCredsSubmit').className.replace(' is-light ', ' is-dark ')
        document.getElementById('dropdownBtn').className = document.getElementById('dropCredsSubmit').className.replace(' is-light ', ' is-dark ')
    }
    var lemmyCreds = {"URL": '', "login": '', "password": ''}
    browser.storage.sync.get('lemmyURL').then((url) => {
        lemmyCreds.URL = url;
        if (typeof(lemmyCreds.URL.lemmyURL) === 'string' && lemmyCreds.URL.lemmyURL) {
            browser.storage.sync.get('lemmyLogin').then((login) => {
                lemmyCreds.login = login;
                if (typeof(lemmyCreds.login.lemmyLogin) === 'string' && lemmyCreds.login.lemmyLogin) {
                    browser.storage.sync.get('lemmyPassword').then((password) => {
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