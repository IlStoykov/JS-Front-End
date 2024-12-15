function solve(input){
    
    let workString = input.shift();
    let commandLine = input.shift();
    while(commandLine != 'Buy'){
        let result = '';
        const [command, substring, replacement] = commandLine.split('?');
        
        switch(command){
            case 'TakeEven':                
                for(let i = 0; i < workString.length; i++){
                    if(i % 2==0){
                        result += workString[i];
                    }
                }
                workString = result;       
                break;

            case 'ChangeAll':
                while(workString.includes(substring)){
                    workString = workString.replace(substring, replacement);
                };                                  
                break;
            
            case 'Reverse':
                const index = workString.indexOf(substring);
                if(index == -1){
                    console.log("error");                
                }
                else{
                    let revSubstring = substring.split('').reverse().join('');
                    workString = workString.replace(substring, '')+revSubstring;                   
                }
                break;                                    
            }
            console.log(workString)        
        
        commandLine = input.shift();
    }
    console.log(`The cryptocurrency is: ${workString}`);
}
solve(["PZDfA2PkAsakhnefZ7aZ", 
"TakeEven",
"TakeEven",
"TakeEven",
"ChangeAll?Z?X",
"ChangeAll?A?R",
"Reverse?PRX",
"Buy"]);
solve(["z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs", 
"TakeEven",
"Reverse?!nzahc",
"ChangeAll?m?g",
"Reverse?adshk",
"ChangeAll?z?i",
"Buy"]);



