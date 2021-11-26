define(function (require) {
    const $ = require("jquery");
    const _ = require("lodash");
    const moment = require("moment");

    const api = require("./api");
    const AUTH_TOKEN =
        "BQCDge-Z07IwLIR2S9XWpS-KzFV_IDa5znZ803EB7ImJKUNqcK3XoZ3DrnmHIDDjFzQ7c4eILScvuhF8onGVDBzg1GV9Ac_lJob2i8FnTc_mdgtzN0g5S3po4SzDHbmP9dEC_w4Fg8bsIIXuKgIuvAqWgFe2078";

    // Use data
    api.getCategories().then(({ categories }) => {
        // Display category card
        categories.items.forEach((item) => {
            $("#category-row").append(
                '<div class="col-sm-3 mt-5"><div class="card">' +
                '<img src="' +
                item.icons[0].url +
                '" class="card-img-top w-100"/>' +
                '<div class="card-body">' +
                '<button class="card-link" data-target="#modalId">' +
                item.name +
                "</button></div></div></div>"
            );
        });

        $(".card").on("click", function () {
            $(".popup-overlay, .popup-content").addClass("active");

            // Ajax call to fetch playlist on clicked category
            cate = categories.items.filter(
                (item) =>
                    item.name == $(this).find('.card-link').text().split('"').join("")
            );
            console.log($(document.activeElement));
            console.log(cate[0].id);

            function getPlayList(id) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url:
                            "https://api.spotify.com/v1/browse/categories/" +
                            id +
                            "/playlists",
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + AUTH_TOKEN,
                        },
                        success: (data, status2) => {
                            console.log(data);
                            resolve(data);
                        },
                        error: (err) => {
                            if (err.status === 401) {
                                alert("Spotify Auth Token is Invalid");
                            } else {
                                reject(err);
                            }
                        },
                    });
                });
            }

            // Display playlist popup
            getPlayList(cate[0].id).then(({ playlists }) => {
                $(".popup-overlay").append(
                    '<button type="button" class="close" aria-label="close">' +
                    '<span aria-hidden="true">&times;</span></button>'
                );
                playlists.items.forEach((item) => {
                    $(".popup-content").append(
                        '<div class="row mb-2"><img class="col-2" src="' +
                        item.images[0].url +
                        '"/>' +
                        '<div class="col-3">' +
                        item.name +
                        "</div>" +
                        '<div class="col-6">' +
                        item.description +
                        "</div></div>"
                    );
                });
            });
        });

        //removes the "active" class to .popup and .popup-content when click "Close"
        $(".close, .popup-overlay").on("click", function () {
            $(".popup-content").empty();
            $(".popup-overlay, .popup-content").removeClass("active");
        });
    });
});
