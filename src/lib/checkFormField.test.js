import checkFormField from "./checkFormField";

test("Returns null if field is required and has truthy value", function(){
    let field = {required : true};
    let value = "Hello";

    expect(checkFormField(field, value)).toBe(null);
})

test("Returns error if field is required and has falsy value", function(){
    let field = {required : true};
    let value = "";

    expect(checkFormField(field, value)).toBe("This field cannot be empty");
})

test("Returns null if field has regex and matches", function(){
    let field = {regex : "/^[a-z]+$/i"};
    let value = "marina";

    expect(checkFormField(field, value)).toBe(null);
});

test("Returns error if field has regex and does not match", function(){
    let field = {regex : "/^[a-z]+$/i"};
    let value = "marina50";

    expect(checkFormField(field, value)).toBe("Value does not match format");
});