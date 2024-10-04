function getSortedElementIndexes(form){
    let elements = form.elements;
    let elementIndexes = Object.keys(form.elements);

    elementIndexes.sort(function(a, b){
        return elements[b].weight - elements[a].weight;
    })

    return elementIndexes;
}

function findNextFieldByWeight(form, selfIndex, direction){
    let elementIndexes = getSortedElementIndexes(form);

    let nextFieldIndex = elementIndexes.indexOf(String(selfIndex));

    if (direction === "lower") nextFieldIndex += 1;
    if (direction === "higher") nextFieldIndex -= 1; 

    if(elementIndexes[nextFieldIndex]){
        return elementIndexes[nextFieldIndex];
    }

    else {
        return null;
    }
}

export default findNextFieldByWeight;