const ps = require('ps-node');
const event = require('events')


event.on("finishProcess", () => {
    ps.kill( '1016', function( err ) {
        if (err) {
            throw new Error( err );
        }
        else {
            console.log( 'Process %s has been killed!', pid );
        }
    });
})

let checker = () => {
    ps.lookup({ pid: 1016 }, function(err, resultList ) {
        if (err) {
            throw new Error( err );
        }
    
        var process = resultList[ 0 ];
    
        if( process ){
    
            console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
        }
        else {
            console.log( 'No such process found!' );
        }
    });
    
}
