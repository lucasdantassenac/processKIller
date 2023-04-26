const 
ps = require('ps-node'),
events = require('events')


let 
processCommand = "WindowsCalculator",
emitter = new events.EventEmitter(),
time = 0,
status = {
    acive: false,               
    opened: false,
}

// event.on("finishProcess", () => {
//     ps.kill('Calculadora')
//     });

let closer = (pid) => {
    try {
        
        console.log('finalizado')
        ps.kill(pid)
     } catch (error) {
         console.log(error)
     }
}

let checkerF = () => {
    ps.lookup({ command: processCommand }, function(err, resultList ) {
        if (err) {
            throw new Error( err );
        }
    
        var process = resultList[ 0 ];
    
        if( process ){
            status.opened = true
            status.active = true
            time++
            console.log('aberto')
            if(time >= 5){
                closer(process.pid)
                
            }
        } else{
            status.active = false
            console.log('fechado')
        }
    });
}

let checker = setInterval(checkerF, 5000)