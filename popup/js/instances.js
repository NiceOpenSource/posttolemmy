const maxLemmy = 300;
var placeholderOption = document.createElement('option')
placeholderOption.setAttribute('disabled', 'true')
placeholderOption.setAttribute('selected', 'true')
placeholderOption.setAttribute('value', '')

function recLemmyIndex(counter) {
    return storage.get('lemmy'+counter.toString()).then((obj) => {
        if (obj['lemmy'+counter.toString()]) {
            return recLemmyIndex(counter+1)
        }
        else return counter;
    }).catch((err) => {console.error(err)})
}

async function getLemmyIndex() {
    return recLemmyIndex(1)
}

function setNewLemmy(creds, counter, fields) {
    if (fields.URL && fields.login && fields.password) {
        getLemmyIndex().then((index) => {
            const obj = JSON.parse(`{"lemmy${index}": {"url": "${creds.URL}", "login": "${creds.login}", "password": "${creds.password}", "index": ${index}}}`)
            storage.set(obj).then(() => console.log("Successfully set new lemmy")).catch((err) => console.log(err))
        });
    } else if (counter > 300) return
    else return setTimeout(setNewLemmy, 100, counter+1, fields)
}

function unsetLemmy(index) {
    storage.remove('currentLemmy')
    $('#lemmySelector').val('')
    getLemmyIndex().then(async (maxindex) => {
        for (let i = index+1; i <= maxindex; i++) {
            var tmp = await storage.get(`lemmy${i+1}`).then((obj) => {
                if (obj[`lemmy${i+1}`]) {
                    var tmp2 = {}
                    tmp2[`lemmy${i}`] = obj[`lemmy${i+1}`]
                    storage.set(tmp2)
                } else {
                    storage.remove(`lemmy${i}`)
                    return true;
                }
            }).catch((err) => {console.log(err)})
            if (tmp) {     
                getLemmies().then((lemmies) => {
                    g_lemmies =  lemmies;
                    populateLemmies(lemmies)
                    createLemmySelector(lemmies)
                }).catch((err) => {console.log(err)})
                return;
            }
        }
    }).catch((err) => {console.log(err)});
}

async function populateLemmies(lemmies) {
    var tmp = {};
    lemmies.forEach((lemmy, index) => {
        lemmyLogin(lemmy).then((jwt) => {
            axios.get(lemmy.url+'api/v3/site', {params: {auth: jwt}}).then((response) => {
                if (response.status === 200) {
                    lemmy.title = response.data.site_view.site.name
                    lemmy.icon = response.data.site_view.site.icon
                    tmp = {}
                    tmp[`lemmy${index+1}`] = lemmy;
                    storage.set(tmp)
                }
                else {
                    console.log('Could not get title from', lemmy.url)
                }
                if (index === lemmies.length - 1) return lemmies
            })
        }).catch((err) => {console.log(err)})
    })
}


async function getLemmies() {
    var i = 1;
    var lemmies = [];
    var flag =true;
    var res;
    while (flag) {
        res = await storage.get('lemmy'+i.toString()).then((obj) => {
            if (obj['lemmy'+i.toString()]) {
                lemmies.push(obj['lemmy'+i.toString()]);
                i++;
            } else {
                flag = false;
                g_lemmies = lemmies;
                return lemmies;
            }
        }).catch((err) => {console.error(err)})
        if (res) return res
    }
}


function createOption(value, text) {
    var res = document.createElement('option')
    res.setAttribute('value', value)
    res.innerText = text
    return res
}


function createLemmySelector(lemmies) {
    if (lemmies) {
        var div = document.createElement('div');
        div.id = 'divLemmySelector';
        div.className = 'select'
        var select = document.createElement('select');
        select.id = 'lemmySelector'
        div.setAttribute('style', 'width: 70%;')
        select.setAttribute('style', 'width: 100%;')

        if (lemmies.length > 0) {
            placeholderOption.innerText = 'Choisissez un lemmy'
            select.appendChild(placeholderOption)
            lemmies.forEach((item, index) => {
                select.appendChild(createOption(index, item.title));
            })
        }
        else {
            placeholderOption.innerText = 'Aucun lemmy, ajoutez-en'
            select.appendChild(placeholderOption)
        }
            
        div.appendChild(select);
        if (document.getElementById('selectLemmy') !== null)
            document.getElementById('selectLemmy').replaceWith(div);
        else document.getElementById('divLemmySelector').replaceWith(div)
        document.querySelector('select#lemmySelector').addEventListener('change', onLemmyChanged)
        storage.get('currentLemmy').then((currentLemmy) => {
            if (currentLemmy.currentLemmy !== undefined) {
                document.querySelector('select#lemmySelector').value = currentLemmy.currentLemmy;
                getSiteCustoms(g_lemmies[currentLemmy.currentLemmy].url)
                GetCommunities(g_lemmies[currentLemmy.currentLemmy])
                
            }
        })
    } else return setTimeout(createLemmySelector, 100, lemmies)
}

var mdropFieldsOk = {"URL": false, "login": false, "password": false}


const btn = $('#dropLemmyInputPasswordToggle')
const icon = btn.children('i')
btn.on('click', () => {
    if (icon.hasClass('fa-eye-slash')) {
        icon.removeClass('fa-eye-slash')
        icon.addClass('fa-eye')
        $('#dropLemmyInputPassword').attr('type', 'text')
    } else {
        icon.removeClass('fa-eye')
        icon.addClass('fa-eye-slash')
        $('#dropLemmyInputPassword').attr('type', 'password')
    }
})

$('#dropLemmyCredsSubmit').on('click', () => {
    let urlEmpty = $('#dropLemmyUrlEmpty')
    let loginEmpty = $('#dropLemmyLoginEmpty')
    let passwordEmpty = $('#dropLemmyPasswordEmpty')
    let urlNoMatch = $('#dropLemmyUrlNoMatch')
    let passwordOrEmailInvalid = $('#dropLemmyPasswordOrEmailInvalid')
    let success = $('#dropLemmySuccess')
    urlEmpty.addClass('hidden')
    loginEmpty.addClass('hidden')
    passwordEmpty.addClass('hidden')
    urlNoMatch.addClass('hidden')
    success.hide()
    passwordOrEmailInvalid.hide()
    const formData = {
        "URL": $('input#dropLemmyInputUrl').val(),
        "login": $('input#dropLemmyInputLogin').val(),
        "password": $('input#dropLemmyInputPassword').val(),
    }
    var matches;
    if (formData.URL) {
        matches = formData.URL.match(/^https?:\/\/[A-Za-z0-9.\-\/]+$/)
        if (matches != null) {
            if (matches[0].length === formData.URL.length) {createLemmySelector
                if (!formData.URL.endsWith('/'))
                    formData.URL += '/';
                mdropFieldsOk.URL = true;
            } else {
                urlNoMatch.removeClass('hidden')
            }
        } else {
            urlNoMatch.removeClass('hidden')
        }
    } else {
        urlEmpty.removeClass('hidden')
    }
    if (formData.login)
        mdropFieldsOk.login = true;
    else {
        loginEmpty.removeClass('hidden')
    }
    if (formData.password)
        mdropFieldsOk.password = true;
    else {
        passwordEmpty.removeClass('hidden')
    }
    axios({
        method: 'POST',
        url: formData.URL+'api/v3/user/login',
        data: {"username_or_email": formData.login, "password": formData.password},
    }).then(function(response) {
        if (response.status === 200) {
            lemmyJwt = response.data.jwt;
            setNewLemmy(formData, 0, mdropFieldsOk);
            success.slideToggle();
            setTimeout(() => {
                getLemmies().then((lemmies) => {
                    populateLemmies(lemmies)
                    setTimeout(() => createLemmySelector(lemmies), 1000)
                })
            }, 1000);

        } else console.log("Error: status code is not 200 ! response.status =" + response.status)

    }).catch((err) => {
        console.log(err)
        setTimeout(() => {
        passwordOrEmailInvalid.slideToggle()
        }, 1000)
    })
});

function onLemmyChanged () {
    var value = $('#lemmySelector').val();
    storage.set({"currentLemmy": value})
    lemmyLogin(g_lemmies[value]).then((jwt) => {
        lemmyJwt = jwt;
        getSiteCustoms(g_lemmies[value].url);
        GetCommunities(g_lemmies[value]);
    })
}

setTimeout(() => {
    getLemmies().then((lemmies) => {
        g_lemmies =  lemmies;
        populateLemmies(lemmies)
        createLemmySelector(lemmies)
    }).catch((err) => {console.log(err)})
}, 500)
