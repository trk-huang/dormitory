layui.define([], function (exports) {

    var store = {
        setToken: function(token){
            localStorage.setItem("token",token);
        },
        getToken: function(){
            return localStorage.getItem("token");
        },
        clear: function(){
            localStorage.removeItem("token");
        }
    }
    exports("store", store);
});
