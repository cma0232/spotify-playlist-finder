
let data = define(function (token) {
    const $ = require('jquery');

    // Token to fetch categories data(expird in 1 hour)
    const AUTH_TOKEN = 'BQDkcvXY1C5r1017L-BbZcbs4oVs7Y2LLjXqKACk7rjRcT1DJIfZ3yymRd7J9KZs-3WJYTud6rGN021s_34ntE44JSgen__kODX-alryWfIcp3DGU51ANIi3EzICFrcRQinjSnMxq94ojx0HuDsF_6v6TJvp5yg';

    const BASE_URL = 'https://api.spotify.com/v1';

    return {
        getCategories: function () {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: BASE_URL + '/browse/categories',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + AUTH_TOKEN
                    },
                    success: (data, status) => {
                        console.log(data);
                        resolve(data);

                    },
                    error: err => {
                        if (err.status === 401) {
                            alert('Spotify Auth Token is Invalid')
                        } else {
                            reject(err);
                        }
                    }
                })
            })
        },

        getPlayList: function(id) {
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
    }

})


