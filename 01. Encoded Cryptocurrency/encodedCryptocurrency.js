function solve(input){
    let result = '';
    let workString = input.shift();
    let commandLine = input.shift();
    while(commandLine != 'Buy'){
        const [command, substring, replacement] = commandLine.split('?');
        
        switch(command){
            case 'TakeEven':
                for(const i = 0; i < result.length; i++){
                    if(i % 2===0){
                        result += workString[i];
                    }
                }
                workString = result;
                console.log(workString);
                break;

            case 'ChangeAll':                
                workString = workString.replace(substring, replacement);
                console.log(workString);
                break;
            
            case 'Reverse':
                const index = workString.indexOf(substring);
                if(index != -1){
                    let revSubstring = substring.split('').reverse().join('');
                    workString = workString.replace(substring, '')+revSubstring;
                    console.log(workString);
                }
                else{
                    console.log("error");
                }
                break;                                    
            }       
        
        commandLine = input.shift();
    }
}
solve(["PZDfA2PkAsakhnefZ7aZ", 
"TakeEven",
"TakeEven",
"TakeEven",
"ChangeAll?Z?X",
"ChangeAll?A?R",
"Reverse?PRX",
"Buy"]);
