
// requires that the java code be in the form {pre} code {post}
export default function dafnyParser(triple: String){
    const hoareTriple = triple.split("/{([^}]*)}/g").filter(Boolean); // [pre, code, post]
    let resultCode: string = "";
    let methodHeader:string = "method test(";
    // each variable in the precondition should be an argument to the Main method.
    // each variable in the postcondition should be a new variable that should be declared in returns.
    // statements can easily be parsed into dafny statements but we cannot use the same variable
    // names as in the method header, so add on `_method` to whatever variable name is used from the precondition.
    // e.g. if the java code uses variables a and b, name them a_method and b_method so we can use their values in 
    // the dafny code

    // find how many variables exist in the precondition
    let variables: string[] = [];
    for(var character of hoareTriple[0]){
        if((character >= 'a'&& character <= 'z') || (character >= 'A' && character <= 'Z') && variables.indexOf(character) === -1){
            variables.push(character)
        }
    }
    for(var variable of variables){
        methodHeader += variable + ": int,";
    }
    methodHeader += ") "

    // get variables to return from postcondition
    let postVariables: string[] = [];
    for(var character of hoareTriple[2]){
        if((character >= 'a'&& character <= 'z') || (character >= 'A' && character <= 'Z') && variables.indexOf(character) === -1){
            variables.push(character)
        }
    }
    methodHeader += "returns (";
    for(var variable of variables){
        methodHeader += variable + "_post: int,";
    }
    methodHeader += ")\n";

    // put in pre and postcondition
    methodHeader += "requires " + hoareTriple[0] + "\n";
    methodHeader += "ensures ";
    for(var postCharacter of hoareTriple[2]){
        methodHeader += postCharacter;
        // if we have a variable in our postcondition we append _method to it
        if(postVariables.indexOf(postCharacter) !== -1){
            methodHeader +="_method";
        }
    }
    methodHeader += "{";


    const statements = triple[1].split("\r\n");
    return resultCode;
}