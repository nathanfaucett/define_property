var isObject = require("@nathanfaucett/is_object"),
    isFunction = require("@nathanfaucett/is_function"),
    isPrimitive = require("@nathanfaucett/is_primitive"),
    isNative = require("@nathanfaucett/is_native"),
    has = require("@nathanfaucett/has");


var nativeDefineProperty = Object.defineProperty;


module.exports = defineProperty;


function defineProperty(object, name, descriptor) {
    if (isPrimitive(descriptor) || isFunction(descriptor)) {
        descriptor = {
            value: descriptor
        };
    }
    return nativeDefineProperty(object, name, descriptor);
}

defineProperty.hasGettersSetters = true;

if (!isNative(nativeDefineProperty) || !(function() {
        var object = {},
            value = {};

        try {
            nativeDefineProperty(object, "key", {
                value: value
            });
            if (has(object, "key") && object.key === value) {
                return true;
            } else {
                return false;
            }
        } catch (e) {}

        return false;
    }())) {

    defineProperty.hasGettersSetters = false;

    nativeDefineProperty = function defineProperty(object, name, descriptor) {
        if (!isObject(object)) {
            throw new TypeError("defineProperty(object, name, descriptor) called on non-object");
        }
        if (has(descriptor, "get") || has(descriptor, "set")) {
            throw new TypeError("defineProperty(object, name, descriptor) this environment does not support getters or setters");
        }
        object[name] = descriptor.value;
    };
}
