
let data = define(function(require) {
    const $ = require('jquery');

    // Token to fetch categories data(expird in 1 hour)
    const AUTH_TOKEN = 'BQDumeswKQmIBbmDPHd4gvb65GbPqnEqV453J5HGdj1wFKqv1-6OotkNAJMxpsH22RaS5lVqLkVCySdw2bkKZbhHuhaal-9wFI0k8KgnEU2ns1AQZ89GaRXy7Wp7llOWHmHj6oTgDghiPZiSQhZvIZo516h2iWg';

    const BASE_URL = 'https://api.spotify.com/v1';

    return {
        getCategories: function(authOptions) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: BASE_URL + '/browse/categories',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + AUTH_TOKEN
                    },
                    success: (data, status) => {
                        catelog = data
                        console.log(data);
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
            })
        },
    }

})


