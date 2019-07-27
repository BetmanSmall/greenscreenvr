var count_show = parseInt($('#show_more').attr('count_show'));
var count_add = parseInt($('#show_more').attr('count_add'));
$(document).ready(function() {
    $.ajaxSetup({ cache: false });
});
$(function() {
    $.getJSON("/gameList.json", function(dataApp) {
        console.log(dataApp[0].steamId);
        $.getJSON('/gameLoad.php?link=http://store.steampowered.com/api/appdetails?appids=' + dataApp[0].steamId + '&l=ru', function(dataApi) {
            var key1 = "data";
            console.log(dataApi[dataApp[0].steamId][key1].header_image);
        });
    });
    var keyData = "data";
    // $.getJSON("/gameList.json", function(dataApp) {
    //     for (var i = count_show; i < count_show + count_add; i++) {
    //         if (dataApp[i].steamId != null) {
    //             $.getJSON("/gameLoad.php?link=http://store.steampowered.com/api/appdetails?appids=" + dataApp[i].steamId + "&l=ru", function(dataApi) {
    //                 $('#gameList').append(
    //                     '<div class="col-12 col-md-6 col-xl-4">' +
    //                     '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
    //                     '<div class="Portfolio"><a href="https://store.steampowered.com/app/' + dataApp[i].steamId + '/">' +
    //                     '<img class="card-img" src="' + dataApi[dataApp[i].steamId][keyData].header_image + '">' +
    //                     '</a><div class="desc">' + dataApi[dataApp[i].steamId][keyData].name +
    //                     '</div>' +
    //                     '</div>'
    //                 )
    //             });
    //             // $('#gameList').append(
    //             //     '<div class="col-12 col-md-6 col-xl-4">' +
    //             //     '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
    //             //     '<div class="Portfolio"><a href="https://store.steampowered.com/app/' + data[i].steamId + '/">' +
    //             //     '<img class="card-img" src="https://steamcdn-a.akamaihd.net/steam/apps/' + data[i].steamId + '/header.jpg">' +
    //             //     '</a><div class="desc">' + data[i].gameName +
    //             //     '</div>' +
    //             //     '</div>'
    //             // )
    //         } else {
    //             $('#gameList').append(
    //                 '<div class="col-12 col-md-6 col-xl-4">' +
    //                 '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
    //                 '<div class="Portfolio"><a href="' + dataApp[i].url + '/">' +
    //                 '<img class="card-img" src="' + dataApp[i].headerImgURL + '">' +
    //                 '</a><div class="desc">' + dataApp[i].gameName +
    //                 '</div>' +
    //                 '</div>'
    //             );
    //         }
    //     }
    //     count_show += count_add;
    // });
    $('#show_more').click(function() {
        $.getJSON("/js/gameList.json", function(data) {
            for (var i = count_show; i < count_show + count_add; i++) {
                if (i != data.length) {
                    if (data[i].steamId != null) {
                        $('#gameList').append(
                            '<div class="col-12 col-md-6 col-xl-4">' +
                            '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
                            '<div class="Portfolio"><a href="https://store.steampowered.com/app/' + data[i].steamId + '/">' +
                            '<img class="card-img" src="https://steamcdn-a.akamaihd.net/steam/apps/' + data[i].steamId + '/header.jpg">' +
                            '</a><div class="desc">' + data[i].gameName +
                            '</div>' +
                            '</div>'
                        )
                    } else {
                        $('#gameList').append(
                            '<div class="col-12 col-md-6 col-xl-4">' +
                            '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
                            '<div class="Portfolio"><a href="' + i.url + '/">' +
                            '<img class="card-img" src="' + data[i].headerImgURL + '">' +
                            '</a><div class="desc">' + data[i].gameName +
                            '</div>' +
                            '</div>'
                        )
                    }
                } else $('#show_more').remove();

            }
            count_show += count_add;
        });
    });
});