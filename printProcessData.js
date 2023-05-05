const ps = require('ps-node')
const axios = require('axios')


ps.lookup({ pid: 6664 }, function(err, resultList ) {
        
    if (err) {
        throw new Error( err );
    }

    var process = resultList[ 0 ];
    console.log(process)
})