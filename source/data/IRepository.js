"use strict";

/**
 * @template T
 * @interface
 * Simple CRUD operation on database models
 */
class IRepository {

    add(instance) {
        throwNotImplemented();
    }

    addMany(instances) {
        throwNotImplemented();
    }

    update(instance) {
        throwNotImplemented();
    }

    remove(instance) {
        throwNotImplemented();
    }

    removeById(id) {
        throwNotImplemented();
    }

    get(id) {
        throwNotImplemented();
    }

    find(params) {
        throwNotImplemented();
    }
}

function throwNotImplemented() {
    throw new Error("Method not implemented");
}

module.exports = IRepository;