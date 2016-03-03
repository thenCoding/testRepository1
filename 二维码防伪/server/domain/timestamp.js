/**
 * Created by stephen on 2016/1/4.
 */
'use strict';

var BaseTypes = require('sequelize');
var util = require('util');

var TIMESTAMP = function () {
    if (!(this instanceof TIMESTAMP)) {
        return new TIMESTAMP();
    }

    BaseTypes.ABSTRACT.apply(this, arguments);
};

util.inherits(TIMESTAMP, BaseTypes.ABSTRACT);

TIMESTAMP.prototype.key = TIMESTAMP.key = 'TIMESTAMP';

exports.TIMESTAMP = TIMESTAMP;