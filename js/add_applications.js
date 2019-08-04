
var dataGames = [];
var addedCount = 0;

$(document).ready(function() {
    $.ajax({
        'async': false,
        'global': false,
        'url': "apps_details.json",
        'dataType': "json",
        'success': function (data) {
            dataGames = data;
        }
    });
    $("#show_more").click();
});

function loadGames() {
    return $.ajax({
        type: "GET",
        url: "/apps_details.json",
        dataType: "json",
        cache: false,
        success: function(dataApp) {
            console.log("Колличество игр: " + dataApp.length);
        }
    });
}

$('#show_more').click(function() {
    var willGames = addedCount;
    for (var i = 0; i < 6; i++) {
        addGameCard(dataGames[willGames + i])
    }
    if (addedCount == dataGames.length) {
        $('#show_more').remove();
    }
});

function addGameCard(gameData) {
    if (gameData) {
        var steam_appid = gameData.steam_appid;
        $('#gameList').append(
            '<div class="col-12 col-md-6 col-xl-4">' +
            '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
            '<div class="Portfolio wrapper">' +
            // '<a href="https://store.steampowered.com/app/' + steam_appid + '/">' +
            '<img class="card-img" src="' + gameData.header_image + '">' +
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
            '<h4 class="modal-title">' + gameData.name + '</h4>' +
            '<div class="divWithIcons" id="divWithIcons' + steam_appid + '">'+
            '</div>'+
            '<button type="button" class="close" data-dismiss="modal">×</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div id="carouselInModal' + steam_appid + '" class="carousel slide carousel-fade" data-ride="carousel">'+
            '<ol class="carousel-indicators" id="cImOL' + steam_appid + '">' +
            '</ol>' +
            '<div class="carousel-inner" role="listbox" id="cImDIV' + steam_appid + '">'+
            '</div>'+
            '<a class="carousel-control-prev" href="#carouselInModal' + steam_appid + '" role="button" data-slide="prev">'+
            '    <span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
            '    <span class="sr-only">Previous</span>'+
            '</a>'+
            '<a class="carousel-control-next" href="#carouselInModal' + steam_appid + '" role="button" data-slide="next">'+
            '    <span class="carousel-control-next-icon" aria-hidden="true"></span>'+
            '    <span class="sr-only">Next</span>'+
            '</a>'+
            '</div>'+
            gameData.short_description +
            '</div>' +
            '<div class="modal-footer">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        )
        for (var m = 0; m < gameData.movies.length; m++) {
            $('#cImDIV' + steam_appid).append(
                '    <div class="carousel-item' + ((m==0) ? (' active\"'):'') + '>'+
                '        <video class="video-fluid w-100" autoplay loop muted>' +
                '            <source src="' + gameData.movies[m].webm.max + '" type="video/webm" />' +
                '        </video>' +
                '    </div>'
            )
            $('#cImOL' + steam_appid).append(
                '<li data-target="#carouselInModal' + steam_appid + '" data-slide-to="'+(m)+'"' + ((m==0)?('class=\"active\"'):'') + '></li>'
            )
        }
        for (var s = 0; s < gameData.screenshots.length; s++) {
            $('#cImDIV' + steam_appid).append(
                '    <div class="carousel-item">'+
                '    <img class="d-block w-100" src="' + gameData.screenshots[s].path_thumbnail + '">'+
                '    </div>'
            )
            $('#cImOL' + steam_appid).append(
                '<li data-target="#carouselInModal' + steam_appid + '" data-slide-to="'+(gameData.movies.length+m)+'"></li>'
            )
        }
        if (gameData.game_mr) {
            $('#divWithIcons' + steam_appid).append(
                '<img class="mrMPicons" src="img/mr.svg" title="Смешанная реальность"/>'
            )
        }
        if (gameData.game_mp) {
            $('#divWithIcons' + steam_appid).append(
                '<img class="mrMPicons" src="img/multiplayer.svg" title="Игра поддерживает мультиплеер"/>'
            )
        }
        addedCount++;
    }
}
