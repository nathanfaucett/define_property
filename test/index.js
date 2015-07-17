var tape = require("tape"),
    defineProperty = require("../src/index");


tape("defineProperty(object, name, value) should add define property on object", function(assert) {
    var person = {};

    defineProperty(person, "name", {
        value: "Bob"
    });

    function fn() {}

    defineProperty(person, "fn", fn);

    assert.equal(person.name, "Bob");
    assert.equal(person.fn, fn);

    assert.end();
});
