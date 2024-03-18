import findChangedKey from "./findChangedKey";

test("Returns first key present in new object that differs", function(){
    let oldValue = {"Name" : "Marina"};
    let newValue = {"Name" : "Marin"};

    expect(findChangedKey(oldValue, newValue)).toBe("Name");
})

test("Returns null if objects are same", function(){
    let oldValue = {"Name" : "Marina"};
    let newValue = {"Name" : "Marina"};

    expect(findChangedKey(oldValue, newValue)).toBe(null);
})

test("Returns value of key not present in old object", function(){
    let oldValue = {};
    let newValue = {"Name" : "Marina"};

    expect(findChangedKey(oldValue, newValue)).toBe("Name");
})

test("Returns value of key not present in new object", function(){
    let oldValue = {"Name" : "Marina"};
    let newValue = {};

    expect(findChangedKey(oldValue, newValue)).toBe("Name");
})