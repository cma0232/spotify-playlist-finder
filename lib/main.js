define(function(require) {
    const $ = require('jquery');
    const _ = require('lodash');
    const moment = require('moment');

    const api = require('./api');

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
            console.log(cate[0].id)
            const AUTH_TOKEN = 'BQAzNeOeeJPK9NIq2LXDxxMR8BxTuxR7Y_5KH6AyhLamDxqplbe2kxtfBPtsNIKjrwukAzfekn7prARg1tIjSBcWyoV0JLxK3cndP7M1YwoBfqjkcTB4JTPMh4ePKfNcndk0RSJt5HRpgOjC9v-znOcrm9ixxv4'

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

                $('#popup-content').empty()
                $('#popup-content').append('<div><button type="button" class="close" aria-label="close">'+
                '<span aria-hidden="true">&times;</span></button></div>')
                playlists.items.forEach( item => {
                    $('#popup-content').append(
                            '<img class="col-2" src="'+ item.images[0].url +'"/>' +
                            '<div class="col-3">'+ item.name +'</div>' 
                            + '<div class="col-6">'+ item.description +'</div>'
                        )
                })
                
            })
        }).catch((error) => {
            console.log(error)
        })

        /*
        catelog = $(document.activeElement).text().split('"').join('')
        $('.popup-content').html('<div>' + catelog + '</div>'+ '<button class="close">Close</button>')
        console.log(catelog)
        */
        });
        
        //removes the "active" class to .popup and .popup-content when click "Close"
        $(".close, .popup-overlay").on("click", function() {
        $(".popup-overlay, .popup-content").removeClass("active");
        });
    });
    $(window).resize(function (){
   if($(window).width() < 600){
   $(".modal-content").css("transform" , "scaleX(1)");
   }
   else{
    $(".modal-content").css("transform" , "scaleX(1.4)");
   }})
})

 