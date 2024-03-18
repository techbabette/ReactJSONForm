function findChangedKey(oldValues, newValues){
    let copyOfOldValues = JSON.parse(JSON.stringify(oldValues));
    let objectWithAllKeys = Object.assign(copyOfOldValues, newValues);
    for(let key in objectWithAllKeys){
        if(oldValues[key] !== newValues[key]){
            return key;
        }
    }
    return null;
}

export default findChangedKey;