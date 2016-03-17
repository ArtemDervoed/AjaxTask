$(document).ready(function () {
    var node = 'http://jsonplaceholder.typicode.com';
    $.ajax({
        method: 'GET'
        , url: node + '/albums'
    }).done(function (savedAlbum) {
        for (var ind = 0; ind < savedAlbum.length; ind++) {
            var $album = document.createElement("li");
            $($album).addClass("album");
            $($album).attr('id', ind);
            var $text = document.createElement("p");
            $($text).append(savedAlbum[ind].title);
            $($album).append($text);
            $("nav").append($album);
        }
        $(".album").click(function () {
            $(".album").css("background-color", "white");
            $(this).css("background-color", "#aaa");
            var $album = this;
            $.ajax({
                url: node + '/photos'
                , method: 'GET'
            }).then(function (savedPhoto) {
                $("#show").empty();
                for (var ind = 0; ind < savedPhoto.length; ind++) {
                    if (savedPhoto[ind].albumId == $album.id + 1) {
                        var $img = document.createElement("img");
                        $img.src = savedPhoto[ind].url;
                        $("#show").append($img);
                    }
                }
            }).fail(function (error) {
                throw "error";
            });
        });
    });
});