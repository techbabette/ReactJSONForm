let formJSON = {
    id : 1,
    name : "New form",
    direction : "row",
    elements : {
        2 : {
            type : {
              id: 1,
              text : "Text",
              type: "text"
            },
            label : "Last name",
            required : true,
            width : 6,
            weight : 99
        },
        3 : {
            type : {
              id: 2,
              text : "Email",
              type: "email"
            },
            label : "Email",
            required : true,
            width : 12,
            weight : 98
        },
        1 : {
            type : {
              id: 1,
              text : "Text",
              type: "text"
            },
            label : "First name",
            required : true,
            width : 6,
            weight : 100,
        },
        4 : {
            type : {
              id: 3,
              text : "Select",
              type: "select"
            },
            label : "Select city",
            required : true,
            width : 12,
            weight : 97,
            options : ["Belgrade", "Novi sad", "Nis"]
        },
        5 : {
            type : {
              id: 3,
              text : "Select multiple",
              type: "select_multiple"
            },
            label : "Select classes",
            required : true,
            hint : "Select multiple",
            width : 12,
            weight : 96,
            options : ["C#", "PHP", "React"]
        }
    }
  }
  

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