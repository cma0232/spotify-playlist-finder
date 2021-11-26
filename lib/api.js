
let data = define(function(require) {
    const $ = require('jquery');

    const AUTH_TOKEN_1 = 'BQCZFVucpuLyS_lihz9hQ0OLsUecxHXuAb7VZMtOQCS1aLyxfRWKJu9CJpUsUeJl7sFbXztXhRDa9_amzLFRR1Th8__2yGok5u0ZNGlmnuWA8KhpaAwScU4vI-X-Rvd8M0RScRu2t_DTmrvy0ip8dXxQYIBdOTw';

    const BASE_URL = 'https://api.spotify.com/v1';
    
    /*
    const client_id = '71d57b72025d47aaabc8700240240ef9'; // Your client id
    const client_secret = '205b600840b9430fb3b9a4625b3e6983'; // Your secret

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + client_id + ':' + client_secret
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    }; */

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
        
        /*
        getPlayList: function(){
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: BASE_URL + '/browse//categories/' + category_id + '/playlists',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + AUTH_TOKEN_2
                    },
                    success: (data, status) => {
                        getPlayList();
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
        }*/
    }

})


