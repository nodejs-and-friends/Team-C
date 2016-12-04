"use strict";

const IRepository = require("./IRepository");

/**
 * @inheritDoc
 * @param {T} Model
 */
class Repository extends IRepository {
    constructor(Model) {
        super();

        validateIsMongooseModel(Model);

        this.Model = Model;
    }

    add(instance) {

        return this.Model.create(instance);
    }

    addMany(instances) {

        return this.Model.addMany(instances);
    }

    update(instance) {

        return instance.save();
    }

    remove(instance) {

        return instance.delete();
    }

    removeById(id) {

        return this.Model.findByIdAndRemove(id);
    }

    get(id) {

        return this.Model.findById(id).exec();
    }

    /**
     * Query database instances
     * @param {object} query - KV map with characteristics of the searched item/s
     * @return {Query<T>} Returns {@link Query} with fluent interface functionality
     * that allows chaining additional processing like ordering and filtration
     * in order to materialize the result call `.exec()` at the end which will
     * return a {@link Promise} object
     * Supported actions: [where(expression), limit(int), sort(+-key)]
     */
    find(query) {

        return this.Model.find(query);
    }
}


function validateIsMongooseModel(model) {

    // Sadly `model instanceof mongoose.Model` returns false and this is the best that stack
    // had to offer
    if (!model || model.name !== "model") {
        throw new Error("The provided model is not an instance of `mongoose` model");
    }
}

module.exports = Repository;