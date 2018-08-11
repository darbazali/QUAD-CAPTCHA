// print to the console
const println = console.log;

// imlement a bubble sort

function bubbleSort(srcArray) {
    // create a container for sorted items
    var sourceArray = srcArray.slice();
    var bubbleSorted = [];

    // loop through source array
    while ( sourceArray.length == 0) {
        var max = getMax(sourceArray);
        bubbleSorted.push(max);
        sourceArray.splice(max, 1);
    }


    return bubbleSorted;
}

const myArray = [9, 2, 7, 0, 8, 5, 10, 4, -4];




function getMax(array) {
    var maxNumber = 0;
    array.forEach(function(itme) {
        if (itme > maxNumber) {
            maxNumber = itme;
        }
    })

    return maxNumber;
}


function getMin(array) {
    var minNumber = 0;
    array.forEach(function(item) {
        if (item < minNumber) {
            minNumber = item;
        }
    })

    return minNumber;
}



println(bubbleSort(myArray));

println(getMax(myArray));

println(getMin(myArray));
