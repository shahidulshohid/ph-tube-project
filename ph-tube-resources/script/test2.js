// const isVerified = true;
// if(isVerified){
//     console.log('verified is true')
// }
// else{
//     console.log('verified is not true')
// }

function getTimeString(time){
    //get hour and rest seconds
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600; 
    const minutes = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${hour} hour ${minutes} minutes ${remainingSeconds} seconds ago`
}
console.log(getTimeString(7865))