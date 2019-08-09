
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

$('#show_more').click(function() {
    var willGames = addedCount;
    for (var i = 0; i < 6; i++) {
        addGameCard(dataGames[willGames + i])
    }
    if (addedCount == dataGames.length) {
        $('#show_more').remove();
    }

    $('.carousel').carousel({
        touch: true,
        interval: 1000
    })

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    $(function () {
        $('.popover-ex').popover({
            container: 'body'
        })
    })
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
    var videos = document.querySelectorAll("video.d-block");
    videos.forEach(function(e) {
        e.addEventListener('ended', videoEnded, false);
        e.addEventListener('play', videoPlay, false);
    });
});

function videoEnded(e) {
    var carouselID = e.currentTarget.parentElement.parentElement.parentElement.getAttribute("id");
    $("#"+carouselID).carousel('next');
    $('#'+carouselID).carousel();
    console.log("ended");
}

function videoPlay(e) {
    var carouselID = e.currentTarget.parentElement.parentElement.parentElement.getAttribute("id");
    $('#'+carouselID).carousel('pause');
    console.log("play-pause");
}

function addGameCard(gameData) {
    if (gameData) {
        var steam_appid = gameData.steam_appid;
        $('#gameList').append(
            '<div class="col-12 col-md-6 col-xl-4">' +
            '   <div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
            '       <a class="game_info" href="#" data-toggle="modal" data-target="#m' + steam_appid + '">'+
            '           <div class="Portfolio wrapper">' +
            '           <img class="card-img" src="' + gameData.header_image + '">' +
            // '<div id="slide">' +
            // '<a class="game_info" href="#" data-toggle="modal" data-target="#m' + steam_appid + '"><img src="img/icons8-info-50.png" class="icon" alt=""></a>' +
            // '</div>' +
            '           </div>' +
            '       </a>'+
            '   </div>' +
            '</div>'
        )
        $('body').append(
            '<div class="modal fade" id="m' + steam_appid + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
            '  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">' +
            '    <div class="modal-content">' +
            '       <div class="modal-header">' +
            '           <div class="divWithIcons" id="divWithIcons' + steam_appid + '"></div>'+
            '           <h3 class="modal-title text-center" id="exampleModalCenterTitle">' + gameData.name + '</h3>' +
            '           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '       </div>' +
            '       <div class="modal-body">' +
            '           <div id="carouselInModal' + steam_appid + '" class="carousel slide carousel-fade" data-ride="carousel">'+
            // '               <ol class="carousel-indicators" id="cImOL' + steam_appid + '"></ol>' +
            '               <div class="carousel-inner" role="listbox" id="cImDIV' + steam_appid + '"></div>'+
            '               <a class="carousel-controls carousel-control-prev" href="#carouselInModal' + steam_appid + '" role="button" data-slide="prev">'+
            '                   <span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
            '                   <span class="sr-only">Previous</span>'+
            '               </a>'+
            '               <a class="carousel-controls carousel-control-next" href="#carouselInModal' + steam_appid + '" role="button" data-slide="next">'+
            '                   <span class="carousel-control-next-icon" aria-hidden="true"></span>'+
            '                   <span class="sr-only">Next</span>'+
            '               </a>'+
            '           </div>'+
            gameData.short_description +
            '       </div>' +
            // '       <div class="modal-footer">' +
            // '           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
            // '           <button type="button" class="btn btn-primary" onclick="window.location.href=\'https://store.steampowered.com/app/' + steam_appid + '\'">Steam</button>'+
            // '       </div>' +
            '    </div>' +
            '  </div>' +
            '</div>'
        )
        for (var m = 0; m < gameData.movies.length; m++) {
            $('#cImDIV' + steam_appid).append(
                '<div class="carousel-item' + ((m==0) ? (' active'):'') + '\">'+
                '    <video id="video'+m+'_'+steam_appid+'" class="d-block video-fluid w-100" controls>' +
                '        <source src="' + gameData.movies[m].webm.max + '" type="video/webm" />' +
                '    </video>' +
                '</div>'
            )
            // $('#cImOL' + steam_appid).append(
            //     '<li data-target="#carouselInModal' + steam_appid + '" data-slide-to="'+(m)+'"' + ((m==0)?('class=\"active'):'') + '\"></li>'
            // )
        }
        for (var s = 0; s < gameData.screenshots.length; s++) {
            $('#cImDIV' + steam_appid).append(
                '<div class="carousel-item">'+
                '    <img class="d-block w-100" src="' + gameData.screenshots[s].path_thumbnail + '">'+
                '</div>'
            )
            // $('#cImOL' + steam_appid).append(
            //     '<li data-target="#carouselInModal' + steam_appid + '" data-slide-to="'+(gameData.movies.length+m)+'"></li>'
            // )
        }
        if (gameData.game_mr) {
            $('#divWithIcons' + steam_appid).append(
                '<button type="button" class="btn btn-success btn-circle popover-ex" data-container="body" data-toggle="popover" data-placement="bottom" data-trigger="focus" title="Смешанная реальность" data-content="Данная игра поддерживает съемку при помощи технологии хромакей"><img src="img/mr.svg" height="30px" class="icon" alt=""></button>'
            )
        }
        if (gameData.game_mp) {
            $('#divWithIcons' + steam_appid).append(
                '<button type="button" class="btn btn-primary btn-circle popover-ex" data-container="body" data-toggle="popover" data-placement="bottom" data-trigger="focus" title="Кооперативная игра" data-content="Данная игра поддерживает многопользовательский режим"><img src="img/mp.svg" height="30px" class="icon" alt=""></button>'
            )
        }
        addedCount++;

        $("#m"+steam_appid).on('hidden.bs.modal', function (e) {
            var videos = document.getElementById(e.currentTarget.getAttribute('id')).querySelectorAll("video.d-block");
            videos.forEach(function(v) {
                v.pause();
            });
        })

        $("#m"+steam_appid).on('shown.bs.modal', function (e) {
            var carouselItemActive = e.currentTarget.querySelector(".carousel-item.active");
            var video = carouselItemActive.querySelector("video");
            video.play();
        })

        // $('#carouselInModal'+steam_appid).on('slide.bs.carousel', function (e) {
        //     console.log(e.currentTarget);
        // });
    }
}
