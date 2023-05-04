const 
ps = require('ps-node'),
events = require('events'),
fs = require('fs')


let 
processCommand = "WindowsCalculator", //processName
emitter = new events.EventEmitter(),
time = 0, //initialTime
timeToClose = 10, //timeLimit
actualDate = new Date().getDate(),
lastDate = null,
//Status of process
status = {
    active: false,               
    opened: false,
}

if(fs.existsSync('./lastDate.txt')) {
    fs.readFile('./lastDate.txt', 'utf8', (err, data) => {
        if(err) return err
        lastDate = Number(data)
    })
}

if(lastDate != actualDate){
    fs.writeFile("./time.txt", String(time), err => {
        if(err) console.log(err)
    })
}

if(fs.existsSync('./time.txt')){
    fs.readFile('./time.txt', 'utf8', (err, data) => {
        if(err) return err
        time = Number(data)
    })
}


//function that close thhe process
let closer = (pid) => {
    try {
        console.log('finalizado')
        ps.kill(pid)
     } catch (error) {
        console.log(error)
     }
     console.log("data atual:"+actualDate)
     console.log("ultima data:"+lastDate)
     fs.writeFile("./lastDate.txt", String(actualDate), err => {
        if(err) console.log(err)
    })
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
            console.log(time)
            console.log('aberto')
            if((time%5) === 0){
                fs.writeFile("./time.txt", String(time), err => {
                    if(err) console.log(err)
                })
            }
            if(time >= timeLimit || lastDate == actualDate){
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

