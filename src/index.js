var isObjectLike = require("is_object_like"),
    isNative = require("is_native"),
    has = require("has");


var defineProperty;


if (isNative(Object.defineProperty) && (function() {
        var object = {};
        try {
            Object.defineProperty(object, "key", {
                value: "value"
            });
            if (has(object, "key") && object.key === "value") {
                return true;
            }
        } catch (e) {}
        return false;
    }())) {
    defineProperty = Object.defineProperty;
} else {
    defineProperty = function defineProperty(object, name, value) {
        if (!isObjectLike(object)) {
            throw new TypeError("defineProperty(object, name, value) called on non-object");
        }
        if (has(value, "get") || has(value, "set")) {
            throw new TypeError("defineProperty(object, name, value) in this environment is does not support getters or setters");
        }
        object[name] = isObjectLike(value) ? value.value : value;
    };
}


module.exports = defineProperty;
