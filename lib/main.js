define(function(require) {
    const $ = require('jquery');
    const _ = require('lodash');
    const moment = require('moment');

    const api = require('./api');
    const token = require('./api').AUTH_TOKEN_1
    console.log(token)
    // Token to fetch playlist data(expird in 1 hour)
    const AUTH_TOKEN = 'BQDumeswKQmIBbmDPHd4gvb65GbPqnEqV453J5HGdj1wFKqv1-6OotkNAJMxpsH22RaS5lVqLkVCySdw2bkKZbhHuhaal-9wFI0k8KgnEU2ns1AQZ89GaRXy7Wp7llOWHmHj6oTgDghiPZiSQhZvIZo516h2iWg'

    // Use data
    api.getCategories().then(({ categories }) => {

        // Display category card
        categories.items.forEach(item => {
            $('#category-row').append(
                '<div class="col-sm-3 mt-5"><div class="card">' +
                '<img src="'+ item.icons[0].url +'" class="card-img-top w-100"/>' +
                '<div class="card-body">'+
                '<button class="card-link" data-target="#modalId">' + item.name + "</button></div></div></div>" );
        })

        $(".card-link").on("click", function() {
        $(".popup-overlay, .popup-content").addClass("active");
        
        // Ajax call to fetch playlist on clicked category
        api.getCategories().then(({categories}) => {
            cate = categories.items.filter(item => item.name == $(document.activeElement).text().split('"').join(''))
            console.log($(document.activeElement))
            console.log(cate[0].id)
            

            function getPlayList(){
                return new Promise((resolve, reject) => {
                $.ajax({
                    
                    url: 'https://api.spotify.com/v1/browse/categories/'+ cate[0].id + '/playlists',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + AUTH_TOKEN
                    },
                    success: (data, status2) => {
                        
                        console.log(data)
                        resolve(data);
                    },
                    error: err => {
                        if(err.status === 401) {
                            alert('Spotify Auth Token is Invalid')
                        } else {
                            reject(err);
                        }
                    }
                })
            })}

            // Display playlist popup
            getPlayList().then(({playlists}) => {
                
                $('.popup-overlay').append('<button type="button" class="close" aria-label="close">'+
                '<span aria-hidden="true">&times;</span></button>')
                playlists.items.forEach( item => {
                    $('.popup-content').append(
                            '<div class="row mb-2"><img class="col-2" src="'+ item.images[0].url +'"/>' +
                            '<div class="col-3">'+ item.name +'</div>' 
                            + '<div class="col-6">'+ item.description +'</div></div>'
                        )
                })
                
            })
        }).catch((error) => {
            console.log(error)
        })
        });
        
        //removes the "active" class to .popup and .popup-content when click "Close"
        $(".close, .popup-overlay").on("click", function() {
        $('.popup-content').empty()
        $(".popup-overlay, .popup-content").removeClass("active");
        });
    });
})