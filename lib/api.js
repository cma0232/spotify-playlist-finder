
let data = define(function(require) {
    const $ = require('jquery');

    // Token to fetch categories data(expird in 1 hour)
    const AUTH_TOKEN_1 = 'BQCXzR3z2Cb41NLAAl3Y_zqdz71ts_asaqy9Qe0-H6n6L14P9Yo4wAy-7itHwyzwCPf3zRnKgj8Ydxs_Xx957ZLSK8rMDZILOuH-1LI5b5AfPl8iQclGqo3Vpl4qeAhWB0M_baiyjcCqqwYgYQDHSAhYWmwQVBw';

    const BASE_URL = 'https://api.spotify.com/v1';

    return {
        getCategories: function(authOptions) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: BASE_URL + '/browse/categories',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + AUTH_TOKEN_1
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


