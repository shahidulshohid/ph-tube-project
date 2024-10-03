const isVerified = '';
// if(isVerified === true){
//     console.log('user is verified')
// }
// else{
//     console.log('user is not verified')
// }

// console.log(`${isVerified === true ? 'user is verified' : 'user is not verified'}`)


function gettimeString(time){
    //get hour and rest seconds
    const hours = parseInt(time / 3600)
    let remainingSecond = parseInt(time % 3600)
    const minute = parseInt(remainingSecond / 60) 
    remainingSecond = remainingSecond % 60;
    return `${hours} hour ${minute} minute ${remainingSecond} second ago`
}
console.log(gettimeString(7865))