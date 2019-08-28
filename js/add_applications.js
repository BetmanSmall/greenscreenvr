
var dataGames = [];
var addedCount = 0;
var globalVolume = 0.1;
var intervalTime = 2500;
var timerId;

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
});

function addGameCard(gameData) {
    if (gameData) {
        var steam_appid = gameData.steam_appid;
        $('#gameList').append(
            '<div class="col-12 col-md-6 col-xl-4">' +
            '   <div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
            '       <a class="game_info" href="#" data-toggle="modal" data-target="#m' + steam_appid + '">'+
            '           <div class="Portfolio wrapper">' +
            '               <img class="card-img" src="' + gameData.header_image + '">' +
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
            '               <div class="carousel-inner" role="listbox" id="cImDIV' + steam_appid + '"></div>'+
            '               <ol class="carousel-indicators" id="cImOL' + steam_appid + '"></ol>' +
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

        $('#carouselInModal'+steam_appid).carousel({
            touch: true,
            interval: false
        })
        $('#carouselInModal'+steam_appid).on('slide.bs.carousel', function (e) {
            var carouselInner = e.target.querySelector(".carousel-inner");
            if (carouselInner.childElementCount != 0) {
                var childrens = e.target.firstElementChild.children;
                var lastVideo = childrens.item(e.from).querySelector("video");
                // console.log(lastVideo);
                if (lastVideo != null) {
                    var isVideoPlaying = !!(lastVideo.currentTime > 0 && !lastVideo.paused && !lastVideo.ended && lastVideo.readyState > 2);
                    // console.log(isVideoPlaying);
                    if (isVideoPlaying) {
                        lastVideo.pause();
                    }
                }
                // console.log(e);
                var carouselID = e.target.getAttribute("id");
                var nextVideo = childrens.item(e.to).querySelector("video");
                // console.log(nextVideo);
                clearInterval(timerId);
                if (nextVideo != null) {
                    var isVideoPlaying = !!(nextVideo.currentTime > 0 && !nextVideo.paused && !nextVideo.ended && nextVideo.readyState > 2);
                    // console.log(isVideoPlaying);
                    // $("#"+carouselID).carousel('pause');
                    if (!isVideoPlaying) {
                        nextVideo.play();
                    }
                    // console.log(carouselID + " pause!");
                } else {
                    // $('#'+carouselID).carousel();
                    timerId = setInterval(carouselNextSlide, intervalTime, carouselID);
                    // console.log(carouselID + " resume! id:" + timerId);
                }
            }
        });

        $("#m"+steam_appid).on('hidden.bs.modal', function (e) {
            clearInterval(timerId);
            var videos = document.getElementById(e.target.getAttribute('id')).querySelectorAll("video");
            videos.forEach(function(v) {
                v.pause();
            });
        });

        $("#m"+steam_appid).on('shown.bs.modal', function (e) {
            var carouselInner = e.target.querySelector(".carousel-inner");
            if (carouselInner.childElementCount == 0) {
                // console.log("#m"+steam_appid + " init!");
                for (var m = 0; m < gameData.movies.length; m++) {
                    $('#cImDIV' + steam_appid).append(
                        '<div class="carousel-item' + ((m==0) ? (' active'):'') + '\">'+
                        '    <video id="video'+m+'_'+steam_appid+'" class="d-block video-fluid w-100" controls playsinline poster="' + gameData.movies[m].thumbnail + '">' +
                        '        <source src="' + gameData.movies[m].webm.low + '.mp4" type="video/mp4" />' +
                        // '        <source src="' + gameData.movies[m].webm.max + '.mp4" type="video/mp4" data-quality="hd"/>' +
                        '        <source src="' + gameData.movies[m].webm.low + '.webm" type="video/webm" />' +
                        // '        <source src="' + gameData.movies[m].webm.max + '.webm" type="video/webm" data-quality="hd"/>' +
                        '    </video>' +
                        '</div>'
                    )
                    $('#cImOL' + steam_appid).append(
                        '<li data-target="#carouselInModal' + steam_appid + '" data-slide-to="'+(m)+'"' + ((m==0)?('class=\"active'):'') + '\"></li>'
                    )
                }
                for (var s = 0; s < gameData.screenshots.length; s++) {
                    $('#cImDIV' + steam_appid).append(
                        '<div class="carousel-item' + ((gameData.movies.length==0) && (s==0) ? (' active'):'') + '\">'+
                        '    <img class="d-block w-100" src="' + gameData.screenshots[s].path_thumbnail + '">'+
                        '</div>'
                    )
                    $('#cImOL' + steam_appid).append(
                        '<li data-target="#carouselInModal' + steam_appid + '" data-slide-to="'+(gameData.movies.length+s)+'"></li>'
                    )
                }
                var videos = document.getElementById('carouselInModal'+steam_appid).querySelectorAll("video");
                videos.forEach(function(e) {
                    e.addEventListener('ended', videoEnded, false);
                    e.addEventListener('pause', videoPause, false);
                    e.addEventListener('play', videoPlay, false);
                    e.addEventListener('volumechange', videoVolumechange, false);
                });
            }
            var carouselItemActive = e.target.querySelector(".carousel-item.active");
            var video = carouselItemActive.querySelector("video");
            if (video != null) {
                video.play();
            }
        });
    }
}

function carouselNextSlide(carouselID) {
    console.log("carouselNextSlide " + carouselID);
    $("#"+carouselID).carousel('next');
}

function videoEnded(e) {
    var carouselID = e.path[3].getAttribute("id");
    $("#"+carouselID).carousel('next');
    // $('#'+carouselID).carousel();
    // console.log("in " + carouselID + " videoEnded!:");
    // console.log(e);
}

function videoPause(e) {
    var carouselID = e.path[3].getAttribute("id");
    console.log("in " + carouselID + " videoPause!:");
    // console.log(e);
}

function videoPlay(e) {
    clearInterval(timerId);
    // console.log("clear-timerId:" + timerId);
    // var carouselID = e.path[3].getAttribute("id");
    // $('#'+carouselID).carousel('pause');
    e.target.volume = globalVolume;
    // console.log("in " + carouselID + " videoPlay!:");
    // console.log(e);
}

function videoVolumechange(e) {
    globalVolume = e.target.volume;
    // console.log("videoVolumechange!:" + globalVolume);
    // console.log(e);
}
