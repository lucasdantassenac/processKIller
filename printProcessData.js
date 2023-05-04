const ps = require('ps-node')
ps.lookup({ pid: 6664 }, function(err, resultList ) {
        
    if (err) {
        throw new Error( err );
    }

    var process = resultList[ 0 ];
    console.log(process)
})