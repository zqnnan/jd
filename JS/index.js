$(function () {
    // ------------倒计时----------
    function formatSeconds(value) {
        var secondTime = parseInt(value); // 秒
        var minuteTime = 0; // 分
        var hourTime = 0; // 小时
        if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if (minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        //  var result = "" + parseInt(secondTime) + "秒";
        if (parseInt(secondTime) < 10) {
            result = "0" + parseInt(secondTime);
            $('.j_sk_s').html(result)
        } else {
            result = "" + parseInt(secondTime);
            $('.j_sk_s').html(result)
        }
        if (minuteTime > 0) {
            if (minuteTime < 10) {
                result = "0" + parseInt(minuteTime);
                $('.j_sk_m').html(result)
            } else {
                result = "" + parseInt(minuteTime);
                $('.j_sk_m').html(result)
            }
        } else {
            result = "00:";
            $('.j_sk_m').html(result)
        }
        if (hourTime > 0) {
            result = "" + parseInt(hourTime);
            $('.j_sk_h').html("0" + result)
        }
        // curr_time.innerText = result;
        // console.log(result)
        return result;
    }
    formatSeconds(7200)
    // console.log(result)
    //24小时内支付
    var time = 7200;

    setInterval(function () {
        time -= 1;
        // console.log(result)
        // console.log(formatSeconds(time))
        formatSeconds(time)
        // $('.seckill-timer').html(formatSeconds(time))
    }, 1000)


    // -----------为你推荐----------
    // global 用来存储全局变量    防止变量被污染，
    // var global = global || {};
    // 确定是第几次加载
    // global.loadStart = 0;
    loadArticalList()

    function loadArticalList() {
        // 判断是否是第一次加载
        // if (global.loadStart == 0) {
        //     $('#tuijian').html('')
        // }
        var result = JD.tuijian;
        var list = result.data.list;
        // 判断数据存不存在
        if (!list || !list.length) {
            // 不存在的话
            $('#tuijian').html('您请求的数据不存在');
        } else {
            // 存在数据
            // 1.获取模板
            for (var i = 0; i < list.length; i++) {
                var htmlModel = $('#itemHtml').html()
                var htmlModel = htmlModel.replace('articleId',list[i].sysId)
                var htmlModel = htmlModel.replace('$title$', list[i].title)
                var htmlModel = htmlModel.replace('$price$', list[i].price)
                var htmlModel = htmlModel.replace('$闪购$', list[i].shan)
                var htmlModel = htmlModel.replace('$看相似$', list[i].tag)
                var htmlModel = htmlModel.replace('../IMG/index/69554d0190f48450.jpg', list[i].imgs)
                var htmlModel = htmlModel.replace('../IMG/index/5aadf9dbN7043e607.png', list[i].img)
                // 进行替换
                // 添加到页面中 Dom append
                $('#tuijian').append(htmlModel)
            }
        }
        // global.loadStart++;
        // global.loadCount = Math.ceil(result.data.count / result.data.pageSize);
        // if (global.loadStart >= global.loadCount) {
        //     $('#lismore').fadeTo(200, 0);
        //     $('.scrollon').attr('src', '../images/list_gomore_bg_nomore.jpg')
        // }
    }
    // $('#lismore').click(function () {
    //     loadArticalList()
    // })


    $(window).scroll(function () {
        if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
            loadArticalList()
        }
        if ($('html,body').scrollTop() >= 500) {
            $('.back-top').css("display", "inline")
        } else(
            $('.back-top').css("display", "none")
        )
        if ($('html,body').scrollTop() >= 1) {
            $('.search').css("background-color", "#e43130")
        } else {
            $('.search').css("background-color", "")
        }
    });
    $('.back-top').click(function () {
        console.log(11111111)
        // $('html,body').scrollTop()==0;
        $('html,body').animate({
            'scrollTop': 0
        }, 1000)
    })


    // -------------获取搜索框焦点-------------
    // 将箭头隐藏
    $('.sangang span').eq(1).hide();
    // 将最近搜搜隐藏
    $('.msContentWraper').hide()
    $('.jd-header-search-input input').focus(function () {
        // 将三杠改成箭头
        // $('.sangang span').css({"height":"0.2rem",
        // "background":"url(../IMG/index/fanhui.png) no-repeat",
        // "margin":"0.12rem 0 0 0.1rem",
        // "background-size": "100% 100%"})
        $('.sangang span').eq(0).hide();
        $('.sangang span').eq(1).show();
        // 改变京东搜索框
        $('.search-box').css("margin-right", "0.52rem")
        // 将京东标识隐藏
        $('.jd-header-icon-jd').hide()
        // 改变搜索标识
        $('.jd-header-icon-fdj').css("margin-left", "0.15rem")
        // 改变input
        $('.jd-header-search-input').css("padding-left", "0.35rem")
        // 改变input默认字
        $(this).attr("placeholder", "洗发水套装")
        // 将登录隐藏
        $('.deng').hide()
        // 将搜索显示
        $('.jd-header-icon-search1').show()
        // 改变搜索框大小
        $('.header-search').css("margin", "0 0.1rem 0 0.4rem")
        // 改变整个头部样式
        $('.header-wrap').css({
            "background": "#fff",
            "border-bottom": "0.01rem solid #e5e5e5"
        })
        // 隐藏全部内容
        $('.container').hide()
        // 隐藏底部
        $('footer').hide()
        // 显示最近搜索
        $('.msContentWraper').show()

        // 点击返回箭头
        if ($('.sangang span').eq(1).show()) {
            $('.sangang').click(function () {
                // 将三杠显示
                $('.sangang span').eq(0).show();
                $('.sangang span').eq(1).hide();
                // 改变京东搜索框
                $('.search-box').css("margin-right", "0.32rem")
                // 将京东标识隐藏
                $('.jd-header-icon-jd').show()
                // 改变搜索标识
                $('.jd-header-icon-fdj').css("margin-left", "0.05rem")
                // 改变input
                $('.jd-header-search-input').css("padding-left", "0.68rem")
                // 改变input默认字
                $(this).attr("placeholder", "暗影游戏本")
                // 将登录隐藏
                $('.deng').show()
                // 将搜索显示
                $('.jd-header-icon-search1').hide()
                // 改变搜索框大小
                $('.header-search').css("margin", "0 0.2rem 0 0.5rem")
                // 改变整个头部样式
                $('.header-wrap').css({
                    "background": "transparent",
                    "border-bottom": "none"
                })
                // 显示全部内容
                $('.container').show()
                // 显示底部
                $('footer').show()
                // 隐藏最近搜索
                $('.msContentWraper').hide()
            })
        }
    })


    // //实时获取input框的事件
    // var arrquan2 = null;
    // var text;
    // var textarr = [];
    // $('.jd-header-search-input input').on('input', function () {
    //     $('.association-normal').html('')
    //     text = $(this).val();
    //     textarr = text.split('')
    //     for (var m = 0; m < textarr.length; m++) {
    //         if (textarr[m] == "'") {
    //             textarr.splice(m, 1)
    //         }
    //     }

    //     text = textarr;
    //     text = text.join('')
    //     if (text == '') {
    //         $('.association-normal').hide()
    //         $('.association-normal').html('')
    //     } else {
    //         $('.association-normal').show()
    //         bijiao()
    //     }


    // })


    // //判断输入框与js文件是否匹配
    // function bijiao() {
    //     for (let z = 0; z < quancheng.length; z++) {
    //         var lgh = text.length;
    //         if (text == quancheng[z].slice(0, lgh)) {
    //             // console.log(hanzi[z])
    //             var cityname = hanzi[z];
    //             var html = `<li">${cityname}</li>`
    //             $('.chengshixiala').append(html)
    //         } else if (text == suoxie[z].slice(0, lgh)) {
    //             // console.log(hanzi[z])
    //             var cityname = hanzi[z]
    //             var html = `<li">${cityname}</li>`
    //             $('.chengshixiala').append(html)
    //         } else if (text == hanzi[z].slice(0, lgh)) {
    //             // console.log(hanzi[z])
    //             var cityname = hanzi[z]
    //             var html = `<li">${cityname}</li>`
    //             $('.chengshixiala').prepend(html)
    //         }
    //     }
    // }

})