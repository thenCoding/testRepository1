/**
 * Created by zen on 2016/2/16.
 */
var assert = require('assert');
var Db = require('../repository/dbcontext');

describe('创建数据库', function () {
    it('创建leo_products表', function (done) {
        Db.createProductsTable().then(function () {
            done();
        });
    });
});
