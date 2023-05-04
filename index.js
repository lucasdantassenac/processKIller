const 
ps = require('ps-node'),
fs = require('fs')


let 
processCommands = ["WindowsCalculator"], //processName
time = 0, //initialTime
timeToClose = 10, //timeLimit
currentDate = new Date().getDate(),
lastDate = null,
i = 0,
//Status of process
status = {
    active: false,               
    opened: false,
}

//see if lastdate file's exists. if exist, lastdate recieve the archive content
if(fs.existsSync('./lastDate.txt')) {
    fs.readFile('./lastDate.txt', 'utf8', (err, data) => {
        if(err) return err
        lastDate = Number(data)
    })
}

//compare system date and file date. if not match, time is 0
if(lastDate != currentDate){
    fs.writeFile("./time.txt", String(time), err => {
        if(err) console.log(err)
    })
}
//if time file's exist, time will recive file's content
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
        console.log("data atual:"+currentDate)
        console.log("ultima data:"+lastDate)
        ps.kill(pid)
     } catch (error) {
        console.log(error)
     }
     fs.writeFile("./lastDate.txt", String(currentDate), err => {
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

            console.log('aberto')
            
            if((time%5) === 0){
                fs.writeFile("./time.txt", String(time), err => {
                    if(err) console.log(err)
                })
            }
            if(time >= timeLimit || lastDate == currentDate){
                closer(process.pid)
            }
        } else{
            status.active = false
            console.log('fechado')
        }
    });
}



processCommands.forEach(processCommand => {
    //check the process every second
    let checker = setInterval(checkerF, 1000, processCommand, timeToClose)
})

