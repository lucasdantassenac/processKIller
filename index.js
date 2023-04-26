const ps = require('ps-node');
const event = require('events')
let processCommand = "WindowsCalculator"
let status = {
    acive: false

}
// event.on("finishProcess", () => {
//     ps.kill('Calculadora')
//     });

let checkerF = () => {
    ps.lookup({ command: processCommand }, function(err, resultList ) {
        if (err) {
            throw new Error( err );
        }
    
        var process = resultList[ 0 ];
    
        if( process ){
            
            console.log( process)
            ps.kill(process.pid)
            console.log('executou')
            clearInterval(checker)
        }

        // else {
        //     console.log( 'No such process found!' );
        // }
    });
    
}

let checker = setInterval(checkerF, 5000)