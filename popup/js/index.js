var fieldsOk = {"URL": false, "login": false, "password": false}
var _lemmyCreds;
var lemmyJwt;
var g_lemmies = [];
const storage = getBrowserStorage();
var postLink = '';

function getBrowserStorage() {
    if (browser) {
        return browser.storage.sync;
    } else return chrome.storage.sync;
}

async function lemmyLogin(creds) {
    return axios.post(creds.url+'api/v3/user/login', {username_or_email: creds.login, password: creds.password})
    .then((response) => {
        if (response.status === 200)
            return response.data.jwt;
        else return '';
    });
}

const cross_browser = browser

function GetCommunities(lemmyCreds) {
    var field = document.createElement('div')
    field.className = "field has-addons my-4 select-field is-primary";
    field.id = "divCommunitySelector";
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
    $('button#mainButton').on('click', () => {
        var value = $('#lemmySelector').val()
        if (value !== '') {
            if (g_lemmies[value]) 
                lemmyLogin(g_lemmies[value]).then((jwt) => {
                    lemmyJwt = jwt
                    createPost(g_lemmies[value])
                })
        }
        else $('#errorNoLemmy').slideDown();
    });
    var tmp;
    lemmyLogin(lemmyCreds).then((jwt) => {
        axios({
            method: 'GET',
            params: {"q": "main", "type_": "Communities", "sort": "Hot", "auth": jwt},
            url: lemmyCreds.url+'api/v3/search'
        }).then((resp) => {
            tmp = document.createElement('option')
            tmp.setAttribute('value', resp.data.communities[0].community.id)
            tmp.innerHTML = `!${resp.data.communities[0].community.name} | ${resp.data.communities[0].community.title}`;
            document.getElementById('communitySelector').appendChild(tmp)
            axios({
                method: 'GET',
                params: {"sort": "New", "type_": "All", "auth": jwt},
                url: lemmyCreds.url+'api/v3/community/list'
            }).then((response) => {
                response.data.communities.forEach((cmObj) => {
                    tmp = document.createElement('option')
                    tmp.setAttribute('value', cmObj.community.id)
                    tmp.innerHTML = `!${cmObj.community.name} | ${cmObj.community.title}`;
                    document.getElementById('communitySelector').appendChild(tmp)
                })
            }).catch((err) => {console.log(err);});
        }).catch((err) => {console.log(err);});
    })
    
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


function runtime() {
    getPost();
}
function createPost(lemmyCreds) {
    if (!$('div#linkPosted').hasClass('hidden')) $('div#linkPosted').addClass('hidden');
    if (!$('p#urlEmpty').hasClass('hidden')) $('p#urlEmpty').addClass('hidden');
    if (!$('p#titleEmpty').hasClass('hidden')) $('p#titleEmpty').addClass('hidden');
    if (!$('p#urlInvalid').hasClass('hidden')) $('p#urlInvalid').addClass('hidden');
    $('button#mainButton').addClass('is-loading');
    $('button#mainButton').css('background-image', 'none');
    console.log('Posting...')
    const title = $('input#postTitle').val()
    const community = $('#communitySelector').val()
    const url = $('input#postUrl').val()
    if (title && url) {
        var matches = lemmyCreds.url.match(/^https?:\/\/[a-z0-9.\-\/]+$/)
        if (matches !== null) {
            if (matches[0].length === lemmyCreds.url.length) {
                const body = {"name": title, "url": url, "body": $('#postText').val(), "nsfw": false, community_id: parseInt(community), auth: lemmyJwt}
                axios({
                    method: 'POST',
                    url: lemmyCreds.url+'api/v3/post',
                    data: body,
                }).then((response) => {
                    if(response.status === 200) 
                    {
                        $('button#mainButton').removeClass('is-loading');
                        $('button#mainButton').css('background-image', "url('img/lemmy.svg')");
                        console.log('New post successfully posted.', lemmyCreds.url+`post/${response.data.post_view.post.id}`)
                        postLink = lemmyCreds.url+`post/${response.data.post_view.post.id}`;
                        $('div#linkPosted').removeClass('hidden');
                        document.getElementById('postLink').href = lemmyCreds.url+`post/${response.data.post_view.post.id}`
                        document.getElementById('postLink').innerText = title.substring(0, 15)+'...';
                    } else console.log('error when trying to post')
                }).catch((err) => {console.log(err)})
            } else $('p#urlInvalid').removeClass('hidden')
        } else $('p#urlInvalid').removeClass('hidden')
    } else {
    $('button#mainButton').removeClass('is-loading');
    $('button#mainButton').css('background-image', "url('img/lemmy.svg')");
        if (!title)
            $('p#titleEmpty').removeClass('hidden')
        if (!url) $('p#urlEmpty').removeClass('hidden')
    }
}

async function init() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme)
        $('#stylesheetTheme').attr('href', 'styles.dark.css')
    runtime()
    $('#errorNoLemmy').hide();
    $('#deleteLemmy').on('click', () => {
        $('#errorDelete').addClass('hidden');
        const val = $('#lemmySelector').val();
        if (val !== '')
            unsetLemmy(parseInt(val));
        else {
            console.log('non');
        }
    })
    
    $('#buttonPreview').on('click', function () {
        var text = document.getElementById('postText').value,
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
        $('#previewModal').children('.modal-content').html(`<p class="my-1 mx-2">${html}</p>`);
        $('#previewModal').addClass('is-active');
    })
    
    $('button.modal-close').on('click', function () {
        $('#previewModal').removeClass('is-active');
    })

    $('#linkPosted').children('a').on('click', function () {
        if (postLink && navigator.userAgent.includes('Chrome/'))
            cross_browser.tabs.create({url: postLink})
    });

}

init()