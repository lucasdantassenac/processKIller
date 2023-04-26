const ps = require('ps-node');
const event = require('events')
let processCommand = "WindowsCalculator"

// event.on("finishProcess", () => {
//     ps.kill('Calculadora')
//     });

let checker = () => {
    ps.lookup({ command: processCommand }, function(err, resultList ) {
        if (err) {
            throw new Error( err );
        }
    
        var process = resultList[ 0 ];
    
        if( process ){
            
            console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
            ps.kill(process.pid)
        }
        else {
            console.log( 'No such process found!' );
        }
    });
    
}

checker()
