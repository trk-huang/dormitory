layui.define(['ztree', 'jquery','axios'], function (exports) {
    "use strict";

    let MOD_NAME = 'selectOrg',
        $ = layui.jquery,
        axios = layui.axios,
        ztree = layui.ztree;
    let selectOrg = function () {
        this.v = '1.1.0';
    };

    /**
     * 初始化ztree
     */
    selectOrg.prototype.render = function (opt) {
        var elem = $(opt.elem);
        var tableDone = opt.done || function(){};
        opt.height = opt.height || 315;

        //最小宽度
        opt.width = opt.width || '530';
        elem.off('click').on('click', function(e) {
            e.stopPropagation();

            if($('div.treeSelect').length >= 1){
                return false;
            }

            var t = elem.offset().top + elem.outerHeight()+"px";
            var l = elem.offset().left +"px";
            var treeBox = '<div class="treeSelect layui-anim layui-anim-upbit" style="left:'+l+';top:'+t+';border: 1px solid #d2d2d2;background-color: #fff;box-shadow: 0 2px 4px rgba(0,0,0,.12);padding:10px 10px 0 10px;position: absolute;z-index:66666666;margin: 5px 0;border-radius: 2px;min-width:'+opt.width+'px;">';
            if(opt.checked){
                treeBox += '<div><button type="button" style="float: right" class="layui-btn layui-btn-normal layui-btn-sm tree-sure">确定</button></div>';
            }
            treeBox += '<div class="ztree" id="ztree_xx">';
            treeBox +='</div>';
            treeBox = $(treeBox);
            $('body').append(treeBox);

            let setting = {
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback:{
                    onClick:function(event,treeId,treeNode){
                            if(!opt.checked){
                                $('.treeSelect').remove();
                                opt.done([treeNode]);
                            }
                    }
                },
                check:{
                    enable:opt.checked
                }
            };
    
            axios.get('org/tree').then(function(res){
                ztree.init($("#ztree_xx"), setting, res.data);
                let treeObj = ztree.getZTreeObj("ztree_xx");
                if(opt.checked){
                    opt.selected.forEach(v=>{
                        let checkNodes = treeObj.getNodesByParam("id",v,null);
                        treeObj.checkNodes
                    })
                    $('.tree-sure').click(function(){
                        let arr = treeObj.getCheckedNodes(tree);
                        opt.done(arr);
                        opt.selected = arr.map(item=>item.id);
                        treeBox.remove();
                    })
                }
                            }).catch(function(error){
                                layer.msg(error);
                            });

            

            $(document).mouseup(function(e){
                let userSet_con = $('' + opt.elem + ',.treeSelect');
                if(!userSet_con.is(e.target) && userSet_con.has(e.target).length === 0){
                    treeBox.remove();
                }
            })
        })
    }


    exports(MOD_NAME, new selectOrg());
})