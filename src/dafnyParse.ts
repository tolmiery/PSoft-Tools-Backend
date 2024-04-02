
// requires that the java code be in the form {pre} code {post}
export default function dafnyParser(triple: String){
    const hoareTriple = triple.split("/{([^}]*)}/g").filter(Boolean);
    let resultCode: string = "";
    resultCode += "method Main";
    // each variable in the precondition should be an argument to the Main method.
    // each variable in the postcondition should be a new variable that should be declared in returns.
    // statements can easily be parsed into dafny statements but we cannot use the same variable
    // names as in the method header, so add on `_method` to whatever variable name is used from the precondition.
    // e.g. if the java code uses variables a and b, name them a_method and b_method so we can use their values in 
    // the dafny code
    return resultCode;
}