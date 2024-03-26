function createIds(startingPoint, random, pokecards = []){
    const ids= [];
    let uniqueIds =[]
    const endPoint = random ? 11 : startingPoint + 11;
    if(random) uniqueIds = [...pokecards]

    for(let i = random ? 0: startingPoint; i <= endPoint; i++){
        if(random){
            const newId = createNewRandomId(uniqueIds);
            ids.push(newId);
            uniqueIds.push(newId);
        }
        else{
            ids.push(i);
        }       
    }
    return ids;
}

function createNewRandomId(ids = []){
    const newId = (Math.floor(Math.random() * 1024))

    if(ids.includes(newId)) return createNewRandomId(ids);
    else return newId;
}

export { createIds };