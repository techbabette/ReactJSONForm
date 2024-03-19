import checkFormFieldsAll from "./checkFormFieldsAll";

test("Returns object with expected errors", function(){
    let fields = {
        1 : {
            required : true,
        },
        2 : {
            required : true,
            regex : "/^[a-z]+$/i"
        }
    }
    let values = {
        1 : "",
        2 : "50"
    }

    let expectedErrors = {1 : "This field cannot be empty", 2 : "Value does not match format"};
    let recievedErrors = checkFormFieldsAll(fields, values);
    expect(Object.is(JSON.stringify(expectedErrors), JSON.stringify(recievedErrors))).toBe(true);
});

test("Returns object with expected lack of errors", function(){
    let fields = {
        1 : {
            required : true,
        },
        2 : {
            required : true,
            regex : "/^[a-z]+$/i"
        }
    }
    let values = {
        1 : "truthy",
        2 : "marina"
    }

    let expectedErrors = {};
    let recievedErrors = checkFormFieldsAll(fields, values);
    expect(Object.is(JSON.stringify(expectedErrors), JSON.stringify(recievedErrors))).toBe(true);
})