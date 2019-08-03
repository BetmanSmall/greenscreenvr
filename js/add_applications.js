
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
            '<button type="button" class="close" data-dismiss="modal">×</button>' +
            '</div>' +
            '<div class="modal-body">' +
            ' <div id="myCarousel" class="carousel slide" data-ride="carousel">' +
            '  <ol class="carousel-indicators">' +
            '    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>' +
            '    <li data-target="#myCarousel" data-slide-to="1"></li>' +
            '    <li data-target="#myCarousel" data-slide-to="2"></li>' +
            '  </ol>' +
            '  <div class="carousel-inner">' +
            '    <div class="item active">' +
            '      <img src="img/slider.png" alt="Los Angeles" style="width:100%;">' +
            '      <div class="carousel-caption">' +
            '        <h3>Los Angeles</h3>' +
            '        <p>LA is always so much fun!</p>' +
            '      </div>' +
            '    </div> ' +
            '    <div class="item">' +
            '      <img src="img/slider.png" alt="Chicago" style="width:100%;">' +
            '      <div class="carousel-caption">' +
            '        <h3>Chicago</h3>' +
            '        <p>Thank you, Chicago!</p>' +
            '      </div>' +
            '    </div>' +
            '    <div class="item">' +
            '      <img src="img/slider.png" alt="New York" style="width:100%;">' +
            '      <div class="carousel-caption">' +
            '        <h3>New York</h3>' +
            '        <p>We love the Big Apple!</p>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '  <a class="left carousel-control" href="#myCarousel" data-slide="prev">' +
            '    <span class="glyphicon glyphicon-chevron-left"></span>' +
            '    <span class="sr-only">Previous</span>' +
            '  </a>' +
            '  <a class="right carousel-control" href="#myCarousel" data-slide="next">' +
            '    <span class="glyphicon glyphicon-chevron-right"></span>' +
            '    <span class="sr-only">Next</span>' +
            '  </a>' +
            '</div>' +
            '</div>' +
            gameData.short_description +
            '</div>' +
            '<div class="modal-footer">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        )
        addedCount++;
    }
}
