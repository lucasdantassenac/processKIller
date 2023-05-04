const 
ps = require('ps-node'),
events = require('events'),
fs = require('fs')

fs.existsSync('./time.txt')
let 
processCommand = "WindowsCalculator", //processName
emitter = new events.EventEmitter(),
time = 0, //initialTime
timeToClose = 5, //timeLimit
//Status of process
status = {
    active: false,               
    opened: false,
}

//function that close thhe process
let closer = (pid) => {
    try {
        console.log('finalizado')
        ps.kill(pid)
     } catch (error) {
        console.log(error)
     }
}

//check if process exist and kill him after the timeLimit
let checkerF = (processName, timeLimit) => {
    //search for project
    ps.lookup({ command: processName }, function(err, resultList ) {
        
        if (err) {
            throw new Error( err );
        }
    
        var process = resultList[ 0 ];
        //ifexists
        if( process ){
            status.opened = true
            status.active = true

            time++

            console.log('aberto')
            if(time / 5 === 0){
                fs.writeFile("time.txt", time)
            }
            if(time >= timeLimit){
                closer(process.pid)
            }
        } else{
            status.active = false
            console.log('fechado')
        }
    });
}

//check the process every second
let checker = setInterval(checkerF, 1000, processCommand, timeToClose)

