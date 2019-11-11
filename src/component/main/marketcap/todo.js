//filternull value
export const filterNull = value => {
  let index = 0;
  while (index < value.length) {
    if (value[index].market_cap === null) {
      value.splice(index, 1);
    }
    index += 1;
  }
  return value.filter(x => x !== null);
};

export const sortMethod =  {
  specificAmount: (value, amountofdata) => {
    let item = [];
  
    const itemPure = (value) => {
      return value.filter(x => x !== null);
    }
    const itemClean = itemPure(value);
  
    for (let i = 0; i < amountofdata; i++) {
      item.push(itemClean[i]);
    }
  
    if (itemClean.length < amountofdata) {
      return [`Out of specificAmount ....! max ${itemClean.length}`];
    }
    return item;
  
  },
  mirrorArray: (array1, array2) =>{
    let mirror = array2;
    if(array1.length < array2.length){
      // console.log(array1.length < array2.length);
      return mirror;
    }
    return array1;
  }

}
