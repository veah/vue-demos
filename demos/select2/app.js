import Vue from '../../dist/vue';

Vue.component('select2', {
    props: ['options', 'value'],
    template: '#select2-template',
    mounted () {
        const vm = this;
        $(this.$el)
            .val(this.value)
            .select2({
                data: this.options
            })
            .on('change', function () {
                vm.$emit('input', this.value);
            });
    },
    watch: {
        value (value) {
            // update value
            $(this.$el).val(value).trigger('change');
        },
        options (options) {
            // update options
            $(this.$el).select2({
                data: options
            });
        }
    },
    destroyed () {
        $(this.$el).off().select2('destroy');
    }
});

const vm = new Vue({
    el: '#el',
    template: '#demo-template',
    data: {
        selected: 0,
        options: [{
            id: 1,
            text: 'Hello'
        },
        {
            id: 2,
            text: 'World'
        }]
    }
});
