define(function(require) {
    const $ = require('jquery');
    const api = require('./api');

    const AUTH_TOKEN = 'BQDeUwR0AQOG6WnNL-kU3iXDzCzkyNqZvxjGZZaa8e3vBCXqcAfIhM2V1jwczeBmj-5kA1AknVnWpIUm9rwgQl0x_38AsKL1uq7gZB8xAJzTrZbZmPMXT-Mbg7Q3-20j3-w5LFaAZIy6r5rxfxTgI1HfDbl59pM';

    cate = $(document.activeElement).text().split('"').join('')
    
    var catalog
    api.getCategories().then(({categories}) => {
        console.log(categories.items)
    }).catch((error) => {
        console.log(error)
    })
   

    return {
        getPlayList: function() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'https://api.spotify.com/v1/browse/categories/hiphop/playlists',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + AUTH_TOKEN
                    },
                    success: (data2, status2) => {
                        
                        resolve(data2);
                    },
                    error: err => {
                        if(err.status === 401) {
                            alert('Spotify Auth Token is Invalid')
                        } else {
                            reject(err);
                        }
                    }
                    
                })
            })
            
        },
    }
    })

