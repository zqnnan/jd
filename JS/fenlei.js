$(function () {
    // -------------点击对应的li让其调用不同的数据
    _index = 0;
    fun()
    $('.jd-category-tab ul li').click(function () {
        var a = $(this).children()
        var par = a.parent().attr('id')
        var h = '#' + par
        a.attr("href", h)
        $(this).addClass('cur').siblings().removeClass('cur');
        _index = $(this).index()
        if (_index == _index) {
            $('.branchList').html('')
        }
        fun()
    })
    
    // ----------获取数据-------
    function fun() {
        // var _index = 0;
        var html = "";
        // console.log(_index)
        for (let i = 0; i < JD['fenlei' + _index].length; i++) {
            html = `<div class="jd-category-div cur">
                <h4></h4>
                <ul class="jd-category-style-1"></ul>
            </div>`;
            $('.branchList').append(html)
            var result = JD["fenlei" + _index][i];
            // console.log(result)
            for (let n in result) {
                var title = result[n].header_title;
                $('.jd-category-div h4').eq(i).text(title)
                var list = result[n].data.list;
            }
            // console.log($('.jd-category-style-1').eq(i))
            // console.log(list.length)
            if (!list || !list.length) {
                // 不存在的话
                $('.jd-category-style-1').eq(i).html('您请求的数据不存在');
            } else {
                // 存在数据
                // 1.获取模板
                for (let m = 0; m < list.length; m++) {
                    var htmlModel = $('#itemHtml').html()
                    var htmlModel = htmlModel.replace('articleId', list[m].sysId)
                    var htmlModel = htmlModel.replace('../IMG/fenlei/5be6ebd8Nb07ef492.png', list[m].img)
                    var htmlModel = htmlModel.replace('$手机$', list[m].title)
                    // 进行替换
                    // 添加到页面中 Dom append
                    $('.jd-category-style-1').eq(i).append(htmlModel)
                    // console.log(list[m].img)
                }
            }
        }
    }
    
})