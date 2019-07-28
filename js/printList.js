var count_show = 0;
// var count_add = parseInt($('#show_more').attr('count_add'));
var arr_steamID = [];
var arr_nonSteamID = [];
var keyData = "data";

function showGameCard(steamId) {
    $.ajax({
        type: "GET",
        url: "/gameLoad.php",
        data: 'link=http://store.steampowered.com/api/appdetails?appids=' + steamId,
        dataType: "json",
        cache: false,
        success: function(dataApi) {
            if (steamId != null) {
                $('#gameList').append(
                    '<div class="col-12 col-md-6 col-xl-4">' +
                        '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
                            '<div class="Portfolio wrapper">' +
                                '<a href="https://store.steampowered.com/app/' + steamId + '/">' +
                                '<img class="card-img" src="' + dataApi[steamId][keyData].header_image + '">' +
                                '<div id="slide">'+
                                    '<a class="game_info" href="#" data-toggle="modal" data-target="#exampleModal" data-whatever="'+dataApi[steamId][keyData].name+'"><img src="img/icons8-info-50.png" class="icon" alt=""></a>'+
                                '</div>' +
                            '</div>'+
                        '</div>'+
                    '</div>'
                )
                count_show++;
            } else { console.log("steamId == null"); }
            console.log("steamId: " + steamId + "\n header_image: " + dataApi[steamId][keyData].header_image + "\n name: " + dataApi[steamId][keyData].name);
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(msg);
        }
    });
}

function initGame() {
    return $.ajax({
        type: "GET",
        url: "/gameList.json",
        dataType: "json",
        cache: false,
        success: function(dataApp) {
            console.log("Колличество игр: " + dataApp.length);
        }
    });
}

$(document).ready(function() {
    $(async function() {
        try {
            const data = await initGame();
            for (var i = 0; i < data.length; i++) {
                if (data[i].steamId != null) {
                    arr_steamID.push(data[i].steamId);
                }
                // Здесь нужно отсеять не стим игры...
            }
            // arr_steamID.forEach(function(item, index, array) {
            //     console.log(item, index);
            // });
            for (var i = 0; i < 6; i++) {
                showGameCard(arr_steamID[i]);
            }
        } catch (err) { console.log(err); }
    });
});
$('#show_more').click(function() {
    for (var i = 0; i < 6; i++) {
        showGameCard(arr_steamID[count_show + i])
    }
    if (count_show = arr_steamID.length) {
        $('#show_more').remove();
    }
});