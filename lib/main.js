define(function(require) {
    const $ = require('jquery');
    const _ = require('lodash');
    const moment = require('moment');

    const api = require('./api');
    //const api2 = require('./api2');

    const container = $('#app');
    /*
    api2.getPlayList().then(({ playlists }) => {
        playlists.items.forEach(item => {
            $('.open').append('<div>' + item.description +'</div>');
        })
    });*/

    api.getCategories().then(({categories}) => {
        console.log(typeof(categories.items))
    }).catch((error) => {
        console.log(error)
    })

    api.getCategories().then(({ categories }) => {
        /* categories.items.forEach(item => {
            container.append(JSON.stringify(item.name));*/
        categories.items.forEach(item => {
            $('.open').append("<button>" + JSON.stringify(item.name) 
                            + "</button>" + "</br>");
        })

        $(".open").on("click", function() {
        $(".popup-overlay, .popup-content").addClass("active");
        
        api.getCategories().then(({categories}) => {
            cate = categories.items.filter(item => item.name == $(document.activeElement).text().split('"').join(''))
            console.log(cate[0].id)
            const AUTH_TOKEN = 'BQDCg4qOz1LX8SZO9GkHMP49nXSIf5mwucgy-7hah-qYRN_p_I-_nxG8GBOADFlyaq6UgNqHPu2ZMXtekrpbe5ZKF6VvggyFnGT-GO5VHHCcKlSc6h7hksoELUoZGvwk_mFgWDyQ15HSnd2hvjHrn0T8_wXjx_g'

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
            getPlayList().then(({playlists}) => {
                $('.popup-content').empty()
                $('.popup-content').append('<button class="close">Close</button>')
                playlists.items.forEach( item => {
                    $('.popup-content').append(
                            '<div class="playlist-name">'+ item.name +'</div>' 
                            + '<div class="playlist-description">'+ item.description +'</div>'
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
})