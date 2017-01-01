new Vue({
    el:'#editor',
    data:{
        input:'# hello'
    },
    computed: {
        compiledMarkdown: function(){
            return marked(this.input,{ sanitize:true })
        }
    },
    methods: {
        //._debounce:距离上次调用匿名函数时间若小于300ms，则继续等待不执行函数
        // 直到调用间隔大于300ms
        update: _.debounce(function(e){
            this.input = e.target.value
        },400)
    }
})