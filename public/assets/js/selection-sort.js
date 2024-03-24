
async function sort() {
    explain("Given array: "+array);
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        select(i);
        pointer(i);
        explain(`Set index ${i} as the position to swap, and min value is ${array[minIndex]}`);
        await delay(stepDelay);
        for (let j = i +  1; j < array.length; j++) {
            pointer(j);
            if (array[j] < array[minIndex]) {
                minIndex = j;
                select1(j);
                explain(`${array[j]} is smaller than ${array[minIndex]} so set it as the new minimum`);
                await delay(stepDelay);
            } else {
                explain(`${array[j]} is greater than ${array[minIndex]} so we skip this index`);
                await delay(stepDelay);
            }
        }
        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
        if (i == minIndex) {
            explain(`We don't have to swap because it's in it right position`);
        } else {
            explain(`We swap ${array[i]} and ${array[minIndex]}`);
        }
        await swap(i, minIndex);
        
    }
    explain(`We're done!`);
    $(".sort").removeClass('disabled');
}