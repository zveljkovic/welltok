require('chai').use((chai, utils) => {
    utils.addMethod(chai.Assertion.prototype, 'route', function(method, path) {
        this.assert(this._obj);
        this.assert(this._obj.server);
        this.assert(this._obj.server.table());
        const route = this._obj.server.table().find((x) => x.method === method && x.path === path);
        this.assert(route, 'Expected route ' + method.toUpperCase() + ' ' + path + ' to exists' );
        this._obj = route;
    });
    utils.addMethod(chai.Assertion.prototype, 'validatePayload', function(schema) {
        this.assert(this._obj);
        this.assert(this._obj.settings.validate.payload, 'Expected route to have validate property');
        new chai.Assertion(this._obj.settings.validate.payload.describe())
            .deep.equal(joi.object().keys(schema).describe(), 'Validation schemas are different');
    });
});
