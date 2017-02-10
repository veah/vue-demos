// transition-components-demo
new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})

// list-complete-demo
new Vue({
  el: '#list-complete-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle: function () {
      this.items = _.shuffle(this.items)
    }
  }
})

// sudoku-demo
new Vue({
    el: '#sudoku-demo',
    data: {
        cells: Array.apply(null,{ length: 81 })
            .map(function(_,index){
                return {
                    id:index,
                    number: index%9 + 1
                }
            })
    },
    methods: {
        shuffle: function() {
            this.cells = _.shuffle(this.cells)
        }
    }
})

// dynamic fade demo
new Vue({
  el: '#dynamic-fade-demo',
  data: {
    temp: '',
    show: true,
    fadeInDuration: 1000,
    fadeOutDuration: 1000,
    maxFadeDuration: 1500,
    stop: false
  },
  mounted: function () {
    this.show = false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      var vm = this
      Velocity(el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: function () {
            done()
            if (!vm.stop) vm.show = false
          }
        }
      )
    },
    leave: function (el, done) {
      var vm = this
      Velocity(el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: function () {
            done()
            vm.show = true
          }
        }
      )
    },
    updateValue: function(){
      var value = this.temp && this.temp.trim()
      if(!value){
        return
      }
      this.maxFadeDuration = value
      this.temp = ''
      
    }
  }
})
