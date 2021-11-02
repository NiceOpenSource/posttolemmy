$('#lemmyInfoDropdown').hide();

browser.storage.sync.get('lemmyURL').then((url) => {
    if (url === null) {
        $('#lemmyInfoDropdown').show();
    } else {
        getSiteCustoms(url)
    }
}).catch((error) => {console.log(error)});

function getSiteCustoms(url) {
    axios({
        method: 'GET',
        params: {"auth": lemmyJwt},
        url: url.lemmyURL+'api/v3/site'
    }).then((response) => {
        if (response.data.site_view.site.icon.match(/^https?:\/\/[A-Za-z0-9.\-\/]+$/))
            $('#serverLogo').attr('src', response.data.site_view.site.icon)
        $('#serverTitle').text(response.data.site_view.site.name)
    })
}

$('#dropdownBtn').on('click', (e) => {
    $('#dropSuccess').hide()
    e.preventDefault();
    $('input#dropInputUrl').val(_lemmyCreds.URL.lemmyURL);
    $('input#dropInputLogin').val(_lemmyCreds.login.lemmyLogin);

    if ($('div.dropdown').hasClass('is-active'))
        $('div.dropdown').removeClass('is-active')
    else
        $('div.dropdown').addClass('is-active')
})

let togglePassword = $('#dropInputPasswordToggle')
let toggleIcon = togglePassword.children('i')
togglePassword.on('click', () => {
    if (toggleIcon.hasClass('fa-eye-slash') && !toggleIcon.hasClass('fa-eye')) {
        $('input#dropInputPassword').attr('type', 'text')
        toggleIcon.addClass('fa-eye')
        toggleIcon.removeClass('fa-eye-slash')
    } else if (toggleIcon.hasClass('fa-eye') && !toggleIcon.hasClass('fa-eye-slash')) {
        $('input#dropInputPassword').attr('type', 'password')
        toggleIcon.addClass('fa-eye-slash')
        toggleIcon.removeClass('fa-eye')
    }
})


var dropFieldsOk = {"URL": false, "login": false, "password": false}


$('#dropPasswordOrEmailInvalid').hide();

$('#dropCredsSubmit').on('click', () => {
    let urlEmpty = $('#dropUrlEmpty')
    let loginEmpty = $('#dropLoginEmpty')
    let passwordEmpty = $('#dropPasswordEmpty')
    let urlNoMatch = $('#dropUrlNoMatch')
    let passwordOrEmailInvalid = $('#dropPasswordOrEmailInvalid')
    let success = $('#dropSuccess')
    urlEmpty.addClass('hidden')
    loginEmpty.addClass('hidden')
    passwordEmpty.addClass('hidden')
    urlNoMatch.addClass('hidden')
    success.hide()
    passwordOrEmailInvalid.hide()
    const formData = {
        "URL": $('input#dropInputUrl').val(),
        "login": $('input#dropInputLogin').val(),
        "password": $('input#dropInputPassword').val(),
    }
    var matches;
    if (formData.URL) {
        matches = formData.URL.match(/^https?:\/\/[A-Za-z0-9.\-\/]+$/)
        if (matches != null) {
            if (matches[0].length === formData.URL.length) {
                if (!formData.URL.endsWith('/'))
                    formData.URL += '/';
                dropFieldsOk.URL = true;
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
        dropFieldsOk.login = true;
    else {
        loginEmpty.removeClass('hidden')
    }
    if (formData.password)
        dropFieldsOk.password = true;
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
            registerInfo(formData, 0, dropFieldsOk);
            success.slideToggle();
            setTimeout(() => window.location.reload(), 3000)

        } else console.log("Error: status code is not 200 ! response.status =" + response.status)

    }).catch((err) => {
        console.log(err)
        setTimeout(() => {
        passwordOrEmailInvalid.slideToggle()
        }, 1000)
    })
});