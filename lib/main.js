define(function (require) {
    const $ = require("jquery");
    const _ = require("lodash");
    const moment = require("moment");

    const api = require("./api");
    
    // Fetch catagories data and display
    api.getCategories().then(({ categories }) => {

        categories.items.forEach((item) => {
            $(".category-row").append(
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

            

            // Display playlist popup
            api.getPlayList(cate[0].id).then(({ playlists }) => {
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
