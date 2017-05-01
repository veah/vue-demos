import Vue from '../../dist/vue';

// register modal component
Vue.component('modal', {
    template: '#modal-template'
});

// init root app
new Vue({
    el: '#app',
    data: {
        showModal: false
    }
});
