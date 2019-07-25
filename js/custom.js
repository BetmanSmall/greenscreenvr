$(function() {
    $(document).scroll(function() {
        var $nav = $(".navbar.fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});
$(function() {
    $.getJSON('../gameList.json', function(data) {
        alert(data);
        if (data) {
            alert("OK");
            for (var i = 0; i < data.length; i++) {
                $('#table').append('<tr><td>' + data[i].steamId + '</td><td>' + data[i].gameName +
                    '</td><td>' + data[i].gameRate + '</td><tr>');
            }
        } else alert("ERROR");

    });
});