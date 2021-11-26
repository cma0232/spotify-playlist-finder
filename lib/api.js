
let data = define(function(require) {
    const $ = require('jquery');

    // Token to fetch categories data(expird in 1 hour)
    const AUTH_TOKEN = 'BQCDge-Z07IwLIR2S9XWpS-KzFV_IDa5znZ803EB7ImJKUNqcK3XoZ3DrnmHIDDjFzQ7c4eILScvuhF8onGVDBzg1GV9Ac_lJob2i8FnTc_mdgtzN0g5S3po4SzDHbmP9dEC_w4Fg8bsIIXuKgIuvAqWgFe2078';

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


