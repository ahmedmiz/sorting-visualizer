const range = document.querySelector(".sizeRange");
const rangeValue = document.querySelector(".sizeValue");
const speedRange = document.querySelector(".speedRange");
const grid = document.querySelector(".grid");
const btn = document.querySelector(".start");
const quick = document.querySelector(".quickSort");
const heap = document.querySelector(".heapSort");
const bubble = document.querySelector(".bubbleSort");



let array = [];
let nodeList = [];
let speed = 1;
let working = false;



range.addEventListener("change", () => {
    rangeValue.innerText = `size of array is ${range.value}`;
    nodeList = [];
    array = [];
    createArray(range.value);

});
speedRange.addEventListener("change", () => {
    speed = speedRange.value;
})
quick.addEventListener("click", () => {
    if (!working) {
        working = true;
        console.log("quick is working....")
        quick.classList.add("clicked");
        quickSort(0, array.length - 1).then(() => { working = false; quick.classList.remove('clicked'); });
    }
});
bubble.addEventListener("click", () => {

    if (!working) {
        console.log("bubble is working...")
        working = true;
        bubble.classList.add("clicked");
        bubbleSort(array.length).then(() => { working = false; bubble.classList.remove("clicked"); });
    }

})
heap.addEventListener("click", () => {

    if (!working) {
        console.log("heap is working...")
        working = true;
        heap.classList.add("clicked");
        heapSort(array.length).then(() => { working = false; heap.classList.remove("clicked") });

    }
})

// ************* creating the array  *****************
function createArray(size) {
    grid.innerHTML = "";
    for (let i = 0; i < size; i++) {
        let node = document.createElement("p");
        node.classList.add("nodeClass");
        nodeList.push(node);
        let height = Math.floor(Math.random() * 300) + 50;
        node.style.height = `${height}px`;
        array.push(height);
    }
    grid.append(...nodeList);
}
// ************* quickSort *****************
async function quickSort(low, high) {

    if (low < high) {
        let pi = await partition(low, high);
        await Promise.all([quickSort(low, pi - 1), await quickSort(pi + 1, high)]);
    }



}
async function partition(low, high) {
    let pivot = array[high];
    let i = (low - 1);
    for (let j = low; j < high; j++) {
        if (array[j] <= pivot) {
            i++;
            await swap(i, j);
        }
    }
    await swap(i + 1, high);
    return (i + 1);
}

//**************** bubble sort ****************
async function bubbleSort(size) {

    for (let step = 0; step < size; ++step) {
        for (let i = 0; i < size - step; ++i) {
            if (array[i] > array[i + 1])
                await swap(i, i + 1);
        }
    }

}
//**************** heap sort function ***************
async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && array[left] > array[largest])
        largest = left;
    if (right < n && array[right] > array[largest])
        largest = right;

    if (largest != i) {
        await swap(i, largest);
        await heapify(n, largest);
    }

}
// main function to do heap sort
async function heapSort(n) {
    // Build max heap
    for (let i = n / 2 - 1; i >= 0; i--)
        await heapify(n, i);

    // Heap sort
    for (let i = n - 1; i >= 0; i--) {
        await swap(0, i);
        await heapify(i, 0);
    }
}

async function End() {
    console.log("end of sorting... ")
    working = false;
}

















//**************** swap function ***************
async function swap(a, b) {
    [array[a], array[b]] = [array[b], array[a]];
    if (nodeList[a] !== undefined && nodeList[b] !== undefined && a !== b) {
        await sleep(50 / speed);
        // pairsToSwap.push([a, b]);
        // [nodeList[a], nodeList[b]] = [nodeList[b], nodeList[a]]
        let temp = nodeList[a].style.height;
        nodeList[a].style.borderLeft = "5px red solid";
        nodeList[b].style.borderLeft = "5px blue solid";
        nodeList[a].style.height = `${nodeList[b].style.height}`;
        nodeList[b].style.height = `${temp}`;
        await sleep(50 / speed);
        nodeList[a].style.borderLeft = "5px green solid";
        nodeList[b].style.borderLeft = "5px green solid";

    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}








