$('#lemmyInfoDropdown').hide();

function getSiteCustoms(url) {
    if (url) {
        axios({
            method: 'GET',
            params: {"auth": lemmyJwt},
            url: url+'api/v3/site'
        }).then((response) => {
            if (response.data.site_view.site.icon.match(/^https?:\/\/[A-Za-z0-9.\-\/]+$/))
                $('#serverLogo').attr('src', response.data.site_view.site.icon)
            $('#serverTitle').text(response.data.site_view.site.name)
        })
    } else console.log('elese site costul')
}

$('#dropdownLemmyBtn').on('click', (e) => {
    $('#dropLemmySuccess').hide()
    $('#dropLemmyPasswordOrEmailInvalid').hide()
    e.preventDefault();
    if ($('div#addLemmyDropdownDiv').hasClass('is-active'))
        $('div#addLemmyDropdownDiv').removeClass('is-active')
    else
        $('div#addLemmyDropdownDiv').addClass('is-active')
})

let togglePassword = $('#dropLemmyInputPasswordToggle')
let toggleIcon = togglePassword.children('i')
togglePassword.on('click', () => {
    if (toggleIcon.hasClass('fa-eye-slash') && !toggleIcon.hasClass('fa-eye')) {
        $('input#dropLemmyInputPassword').attr('type', 'text')
        toggleIcon.addClass('fa-eye')
        toggleIcon.removeClass('fa-eye-slash')
    } else if (toggleIcon.hasClass('fa-eye') && !toggleIcon.hasClass('fa-eye-slash')) {
        $('input#dropLemmyInputPassword').attr('type', 'password')
        toggleIcon.addClass('fa-eye-slash')
        toggleIcon.removeClass('fa-eye')
    }
})

togglePassword = $('#dropInputPasswordToggle')
toggleIcon = togglePassword.children('i')
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


$('#dropLemmyPasswordOrEmailInvalid').hide();