const testCases = [[1, 2, 4, 5, 6], 
                 [10, 11, 12, 14], 
                 [3, 4, 5, 6, 7]]


function findMissing(array){
    if (array.length < 2){
        return null
    }
    for(let i = 1; i < array.length; i++){
        expectedVal = array[i - 1] + 1
        currentVal = array[i]
        if (expectedVal != currentVal) {
            return expectedVal
        }
    }
    return null
}

for(let i = 0; i < testCases.length; i++){
    let ans = findMissing(testCases[i])
    console.log(ans)
}
