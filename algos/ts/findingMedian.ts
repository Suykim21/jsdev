// Finding median on unsorted array of numbers

function findingMedian(a: number[]): number {
  const sortedArr: number[] = a.sort();
  const isEven: boolean = sortedArr.length % 2 === 0;
  
  return isEven ? (sortedArr[sortedArr.length/2] + sortedArr[sortedArr.length/2 - 1]) / 2 : sortedArr[Math.floor(sortedArr.length/2)];
}
