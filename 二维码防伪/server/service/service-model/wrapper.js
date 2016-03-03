/**
 * Created by zen on 2016/2/16.
 */
/**
 * 包装类
 */
wrapper = function (status,message) {
    this.content = {};
    this.status = status || 0;
    this.message = message|| "successful";
    this.total = 0;
};

module.exports = wrapper;
