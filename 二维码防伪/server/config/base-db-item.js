/**
 * Created by zen on 2016/2/17.
 */
var Sequelize = require('../node_modules/sequelize');
var DataType = require('../domain/timestamp');
var Base = function () {

    /**
     * 是否被删除
     * @type {{type: *, field: string}}
     */
    this.recycled = {
        type: Sequelize.BOOLEAN,
        field: 'recycled',
        defaultValue:false
    };

    /**
     * 创建时间
     * @type {{type: *, field: string}}
     */
    this.createdAt = {
        type: Sequelize.DATE,
        field: 'createdAt'
    };

    /**
     * 创建人
     * @type {{type: *, field: string}}
     */
    this.creator = {
        type: Sequelize.STRING,
        field: 'creator'
    };

    /**
     * 修改人
     * @type {{type: *, field: string}}
     */
    this.modifier = {
        type: Sequelize.STRING,
        field: 'modifier'
    };

    /**
     * 修改时间
     * @type {{type: (*|TIMESTAMP), field: string}}
     */
    this.updatedAt = {
        type: DataType.TIMESTAMP,
        field: 'updatedAt'
    };

    /**
     *
     * @type {{type: *, field: string, autoIncrement: boolean, allowNull: boolean, primaryKey: boolean}}
     */
    this.id = {
        type: Sequelize.UUID,
        field: 'id',
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    };

    /**
     * 状态
     * @type {{type: string, filed: string}}
     */
    this.status={
        type:Sequelize.INTEGER,
        filed:'status'
    };
};


module.exports = Base;