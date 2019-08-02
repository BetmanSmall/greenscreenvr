
$(document).ready(function() {
    $.getJSON("/apps_details.json", function(data) {
        console.log(data);
        if (data) {
            for (var appIndex = 0; appIndex < data.length; appIndex++) {
                var steam_appid = data[appIndex].steam_appid;
                $('#gameList').append(
                    '<div class="col-12 col-md-6 col-xl-4">' +
                    '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
                    '<div class="Portfolio wrapper">' +
                    // '<a href="https://store.steampowered.com/app/' + steam_appid + '/">' +
                    '<img class="card-img" src="' + data[appIndex].header_image + '">' +
                    '<div id="slide">' +
                    '<a class="game_info" href="#" data-toggle="modal" data-target="#m' + steam_appid + '"><img src="img/icons8-info-50.png" class="icon" alt=""></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                )
                $('body').append(
                    '<div class="modal fade bd-example-modal-lg" id="m' + steam_appid + '" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog modal-lg modal-dialog-centered" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<h4 class="modal-title">' + data[appIndex].name + '</h4>' +
                    '<button type="button" class="close" data-dismiss="modal">×</button>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    data[appIndex].short_description +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                )
            }
        }
    });
});
