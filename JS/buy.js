$(function () {

    //三个点事件
    $('.jd-header-icon-new-shortcut span').click(function () {
        $('.header-shortcut-ul').toggle();
    })

    //输入框里内容的动态变化
    function Dt() {
        var arr = ['脆枣', '耳机', '酸辣粉', '纸巾', '肥皂盒', '灭蚊灯']
        var i = 0
        setInterval(function () {
            i++;
            if (i == arr.length - 1) {
                i = 0;
            }
            $('.mod_searchbar_text').attr('placeholder', '大家都在搜 ' + arr[i])
        }, 3000)
    }
    Dt()

    //关于模糊查询弹出框的显示隐藏
    $('.mod_searchbar_text').bind('input', function () {
        Value = $(this).val();
        console.log(Value)
        if (Value != '') {
            $('.autocompleter').show();
        }
    })


    //输入框事件
    $('.mod_searchbar_text').focus(function () {
        $('.mod_searchbar_btn').show();
        $('.search_block').addClass('search_block_actived')
        $('.mod_searchbar_form').css('background-color', '#f2f2f7')
        $('.featured-wrapper').hide();
        $('.category-wrapper').hide();
        $('.tab-nav__main ').hide();
        $('.tab-nav__sub').hide();
        $('.ping_footnav').hide();
        $('.floating').hide();
        $('.quick-nav').hide();
        $('.smartboxBlock').show();
        $('.autocompleter').hide();


        //关于回退按钮
        // console.log($('.search_block').hasClass('search_block_actived'))
        if ($('.search_block').hasClass('search_block_actived')) {
            $('.jd-header-icon-back span').click(function () {
                $('.mod_searchbar_btn').hide();
                $('.search_block').removeClass('search_block_actived')
                $('.mod_searchbar_form').css('background-color', '#fff')
                $('.featured-wrapper').show();
                $('.category-wrapper').show();
                $('.tab-nav__main ').show();
                $('.ping_footnav').show();
                $('.floating').show();
                $('.quick-nav').show();
                $('.autocompleter').hide();
                $('.smartboxBlock').hide();
            })
        }
    })
    $('.quxiao').click(function () {
        $('.mod_searchbar_btn').hide();
        $('.search_block').removeClass('search_block_actived')
        $('.mod_searchbar_form').css('background-color', '#fff')
        $('.featured-wrapper').show();
        $('.category-wrapper').show();
        $('.tab-nav__main ').show();
        $('.ping_footnav').show();
        $('.floating').show();
        $('.quick-nav').show();
        $('.autocompleter').hide();
        $('.smartboxBlock').hide();
        console.log($('.search_block').hasClass('search_block_actived'))
        if (!($('.search_block').hasClass('search_block_actived'))) {
            $('.jd-header-icon-back span').click(function () {
                location.href = 'https://www.baidu.com'
            })
        }
    })


    //输入框模糊查询
    var colors =
        [
            {
                "label": "耳    机|erji|ej|耳机",
            },
            {
                "label": "脆    枣|cuizao|cz|脆枣",
            },
            {
                "label": "酸辣粉|suanlafen|slf",
            },
            {
                "label": "纸    巾|zhijin|zj|纸巾",
            },
            {
                "label": "肥皂盒|feizaohe|fzh",
            },
            {
                "label": "灭蚊灯|miewendeng|mw",
            },
        ]
    $('#mohu').autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,

        // object to local or url to remote search
        source: colors,

        // custom template
        // template: '{{ label }}',
        template: '{{ label }} <span class="baiban"></span>',

        // show hint
        // hint: true,

        // abort source if empty field
        empty: false,

        // max results
        limit: 3,
    });

    //将搜索内容存入历史记录cookie
    console.log(document.cookie)
    var oCookie = document.cookie.split('; ');
    console.log(oCookie)
    for (var i = 0; i < oCookie.length; i++) {
        var zz = oCookie[i].split('=')
        console.log(zz)
        if (zz[0].slice(0, 4) == 'city') {
            var cityname2 = zz[0].slice(4);
            htmla = `
                <li class="keyword">
                <a href="javascript:;">${cityname2}</a>
            </li>`
            $('.two_row ul').prepend(htmla)
        }
    }
    

    //点击清除删除所有内容
    $($('.title_btn').eq(0)).click(function(){
       $ ($('.search_panel_title').eq(0)).hide();
       $('.two_row').hide();
    })

    //点击换衣批更改第一个内容
    function huan(){
        var arr = ['脆枣', '耳机', '酸辣粉', '纸巾', '肥皂盒', '灭蚊灯']
        var i=-1;
        var isflag=false;
        if(!isflag){
            isflag=true;
            $($('.title_btn').eq(1)).click(function(){
                i++;
                if(i==arr.length-1){
                    i=0;
                }
                $($('.huan a').eq(0)).text(arr[i])
            })
            setTimeout(function(){
                console.log('kai')
                isflag=false;
            },9000)
        }
    }
    huan()


    //拼购数据调用 今日必拼
    function pinG(index, model) {
        var list = pingouDate[index].data.list;
        if (!list || !list.length) {//=====>进行异常处理
            //不存在的话
            $(model).html('您请求的数据不存在');
        } else {
            //存在数据
            //1、获取模板
            for (var i = 0; i < list.length; i++) {
                var repla = $('#model').html();
                //进行替换
                repla = repla.replace('articleId', list[i].sysId);
                repla = repla.replace("../IMG/buyimg/./pin1.dpg", list[i].Img);
                repla = repla.replace('$2人拼$', list[i].sub_title1);
                repla = repla.replace('$￥$', list[i].price_icon);
                repla = repla.replace('$7$', list[i].sub_title2);
                repla = repla.replace('$.80$', list[i].sub_title3);
                repla = repla.replace('$已有608人拼$', list[i].sub_title4);
                //添加到页面中 
                $(model).append(repla)
            }
        }
    }
    pinG('pingouDate00', '.slide0');
    pinG('pingouDate01', '#slide1');
    pinG('pingouDate02', '#slide2');
    pinG('pingouDate03', '#slide3');
    pinG('pingouDate04', '.slide4');

    //精选数据调用

    jingX('jingxuan00', '.pin-like__list')

    function jingX(index, model) {
        var list = jingxuan[index].data.list;
        if (!list || !list.length) {//=====>进行异常处理
            //不存在的话
            $(model).html('您请求的数据不存在');
        } else {
            //存在数据
            //1、获取模板
            for (var i = 0; i < list.length; i++) {
                var repla = $('#model1').html();
                //进行替换
                repla = repla.replace('articleId', list[i].sysId);
                repla = repla.replace("../IMG/buyimg/./jing1.jpg", list[i].Img);
                repla = repla.replace('$2人拼$', list[i].sub_title1);
                repla = repla.replace('$¥$', list[i].price_icon);
                repla = repla.replace('$1$', list[i].sub_title2);
                repla = repla.replace('$.9$', list[i].sub_title3);
                repla = repla.replace('$已拼1.5万件$', list[i].sub_title4);
                repla = repla.replace('$车载手机支架$', list[i].des);
                //添加到页面中 
                $(model).append(repla)
            }
        }
    }

    //除精选以外
    $('.tab-nav__item').click(function () {
        if ($(this).children().text() != '精选') {
            $($('.tab-nav__ctn').children()).removeClass('tab-nav__item--on')
            $('.category-wrapper').show();
            $('.featured-wrapper').hide();
            $('.tab-nav__sub').show();
        } else {
            $($('.taro-scroll').children()).removeClass('tab-nav__item--on')
            $('.tab-nav__sub').hide();
            $('.category-wrapper').hide();
            $('.featured-wrapper').show();
        }
        $(this).addClass('tab-nav__item--on').siblings().removeClass('tab-nav__item--on');
        _index = $(this).index();

        console.log(_index)
        if (_index == _index) {
            $('.category-list__wrapper').html('')
            $('.tab-nav__sub').html('')
        }
        Cjing()
        CjingX()
    })

    // 除除精选以外小框模板
    function Cjing() {
        var result = chujingxuan['chujingxuan0' + _index]
        var list = result.data.list;
        console.log(list)
        if (!list || !list.length) {//=====>进行异常处理
            //不存在的话
            $('.tab-nav__sub').html('您请求的数据不存在');
        } else {
            //存在数据
            //1、获取模板
            for (var i = 0; i < list.length; i++) {
                var repla = $('#model2').html();
                //进行替换
                repla = repla.replace('articleId', list[i].sysId);
                repla = repla.replace("../IMG/buyimg/./mobile1.png", list[i].Img);
                repla = repla.replace('$手机$', list[i].price_icon);
                //添加到页面中 
                $('.tab-nav__sub').append(repla)
            }
        }
    }


    //除精选以外大框模板
    function CjingX() {
        var result = chujingxuanD['chujingxuanD0' + _index]
        var list = result.data.list;
        if (!list || !list.length) {//=====>进行异常处理
            //不存在的话
            $('.category-list__wrapper').html('您请求的数据不存在');
        } else {
            //存在数据
            //1、获取模板
            for (var i = 0; i < list.length; i++) {
                var repla = $('#model1').html();
                //进行替换
                repla = repla.replace('articleId', list[i].sysId);
                repla = repla.replace("../IMG/buyimg/./jing1.jpg", list[i].Img);
                repla = repla.replace('$2人拼$', list[i].sub_title1);
                repla = repla.replace('$¥$', list[i].price_icon);
                repla = repla.replace('$1$', list[i].sub_title2);
                repla = repla.replace('$.9$', list[i].sub_title3);
                repla = repla.replace('$已拼1.5万件$', list[i].sub_title4);
                repla = repla.replace('$车载手机支架$', list[i].des);
                //添加到页面中 
                $('.category-list__wrapper').append(repla)
            }
        }
    }

    //鼠标滚动触发事件
    $(window).scroll(function () {
        // alert(111)
        // 图片瀑布流
        //$(document).scrollTop() 当前滚过的区域
        //$(window).height() 可以看见的区域
        //$(document).height() 整个可以滚动的区域
        if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
            jingX('jingxuan00', '.pin-like__list');
            CjingX()
        }
        //返回顶部按钮的显示隐藏
        if ($('html,body').scrollTop() >= 500) {
            $('.index__back-top').fadeIn(100)
        } else (
            $('.index__back-top').fadeOut(100)
        )
        //鼠标上下滚动效果
        if ($('html,body').scrollTop() >= 1) {
            //判断鼠标滚轮方向
            $(document).on("mousewheel DOMMouseScroll", function (e) {
                var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                    (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
                if (delta > 0) {
                    // 向上滚
                    $('.search_block').css({ 'position': 'fixed', 'top': '0rem' })
                    $('.tab-nav__main').css({ 'position': 'fixed', 'top': '0.49rem', 'background': '#ff4142' })

                } else if (delta < 0) {
                    // 向下滚
                    $('.search_block').css({ 'position': 'absolute', 'top': '0.44rem' })
                    $('.tab-nav__main').css({ 'position': 'fixed', 'top': '0rem', 'background': '#ff4142' })
                }
            });
        } else {
            $(document).off("mousewheel DOMMouseScroll");
            $('.tab-nav__main').css({ 'position': 'absolute', 'top': '0.93rem', 'background': 'transparent' })
            $('.search_block').css({ 'position': 'absolute', 'top': '0.44rem' })
        }
    });

    //返回顶部
    $('.index__back-top').click(function () {
        $('html,body').animate({ 'scrollTop': 0 }, 1000)
    })

    //尾部点击事件
    $('.ping_footnav_item').click(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
    })

    //侧边栏一元购
    $('.floating__close').click(function () {
        $('.floating__image').hide()
    })
    //侧边栏收起切换
    $('.quick-nav__toggle ').click(function () {
        $('.quick-nav').toggleClass('quick-nav--unfold');
        // console.log()
        if ($('.quick-nav').hasClass('quick-nav--unfold')) {
            $('.quick-nav__toggle-text').html('收起');
        } else {
            $('.quick-nav__toggle-text').html('快速导航');
        }
    })

})