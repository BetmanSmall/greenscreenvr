var count_show = parseInt($('#show_more').attr('count_show'));
var count_add = parseInt($('#show_more').attr('count_add'));

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message); // + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
$(function() {
    $.ajaxSetup({
        async: false
    });
    // $.getJSON("/gameList.json", function(dataApp) {
    //     console.log(dataApp[0].steamId);
    //     $.getJSON('/gameLoad.php?link=http://store.steampowered.com/api/appdetails?appids=' + dataApp[0].steamId + '&l=ru', function(dataApi) {
    //         var keyData = "data";
    //         $('#gameList').append(
    //             '<div class="col-12 col-md-6 col-xl-4">' +
    //             '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
    //             '<div class="Portfolio"><a href="https://store.steampowered.com/app/' + dataApp[0].steamId + '/">' +
    //             '<img class="card-img" src="' + dataApi[dataApp[0].steamId][keyData].header_image + '">' +
    //             '</a><div class="desc">' + dataApi[dataApp[0].steamId][keyData].name +
    //             '</div>' +
    //             '</div>'
    //         )
    //     });
    // });

    // ajax_get('/gameList.json', function(dataApp) {
    //     // for (var i = count_show; i < count_show + count_add; i++) {
    //     for (var i = 0; i < 6; i++) {
    //         console.log("StemaID: " + dataApp[i].steamId);
    //         ajax_get('/gameLoad.php?link=http://store.steampowered.com/api/appdetails?appids=' + dataApp[i].steamId + '&l=ru', function(dataApi) {
    //             var keyData = "data";
    //             // console.log("StemaID: " + dataApp[i].steamId);
    //             // console.log("ApiImg: " + dataApi);
    //             // console.log("ApiName" + dataApi[dataApp[i].steamId]["data"].name);
    //             $('#gameList').append(
    //                 '<div class="col-12 col-md-6 col-xl-4">' +
    //                 '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
    //                 '<div class="Portfolio"><a href="https://store.steampowered.com/app/' + dataApp[i].steamId + '/">' +
    //                 '<img class="card-img" src="' + dataApi[dataApp[i].steamId][keyData].header_image + '">' +
    //                 '</a><div class="desc">' + dataApi[dataApp[i].steamId][keyData].name +
    //                 '</div>' +
    //                 '</div>'
    //             )
    //         });
    //     }
    // });
    // document.getElementById("gameList").innerHTML = data["title"];

    // var html = "<h2>" + data["title"] + "</h2>";
    // html += "<h3>" + data["description"] + "</h3>";
    // html += "<ul>";
    // for (var i = 0; i < data["articles"].length; i++) {
    //     html += '<li><a href="' + data["articles"][i]["url"] + '">' + data["articles"][i]["title"] + "</a></li>";
    // }
    // html += "</ul>";
    // document.getElementById("text").innerHTML = html;
    // });

    $.getJSON("/gameList.json", function(dataApp) {
        // for (var i = count_show; i < count_show + count_add; i++) {
        var keyData = "data";
        for (var i = 0; i < dataApp.length; i++) {
            var v_steamId = dataApp[i].steamId;

            if (dataApp[i].steamId != null) {
                console.log(dataApp[i].steamId);
                $.getJSON('/gameLoad.php?link=http://store.steampowered.com/api/appdetails?appids=' + v_steamId + '&l=ru', function(dataApi) {

                    $('#gameList').append(
                        '<div class="col-12 col-md-6 col-xl-4">' +
                        '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
                        '<div class="Portfolio"><a href="https://store.steampowered.com/app/' + v_steamId + '/">' +
                        '<img class="card-img" src="' + dataApi[v_steamId][keyData].header_image + '">' +
                        '</a><div class="desc">' + dataApi[v_steamId][keyData].name +
                        '</div>' +
                        '</div>'
                    )
                });
                // $('#gameList').append(
                //     '<div class="col-12 col-md-6 col-xl-4">' +
                //     '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
                //     '<div class="Portfolio"><a href="https://store.steampowered.com/app/' + data[i].steamId + '/">' +
                //     '<img class="card-img" src="https://steamcdn-a.akamaihd.net/steam/apps/' + data[i].steamId + '/header.jpg">' +
                //     '</a><div class="desc">' + data[i].gameName +
                //     '</div>' +
                //     '</div>'
                // )
            }
            // else {
            //     $('#gameList').append(
            //         '<div class="col-12 col-md-6 col-xl-4">' +
            //         '<div class="d-flex flex-column align-items-end justify-content-between p-3 block">' +
            //         '<div class="Portfolio"><a href="' + dataApp[i].url + '/">' +
            //         '<img class="card-img" src="' + dataApp[i].headerImgURL + '">' +
            //         '</a><div class="desc">' + dataApp[i].gameName +
            //         '</div>' +
            //         '</div>'
            //     );
            // }
        }
        count_show += count_add;
    });
});
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