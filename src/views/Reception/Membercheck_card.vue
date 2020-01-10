<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <tinymce-editor ref="editor"
                        v-model="msg"
                        :disabled="disabled"
                        @onClick="onClick">
        </tinymce-editor>
        <button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button>

        <div>{{ msg }}</div>
        <div v-html="msg3" class="box"></div>

    </div>

</template>

<script>
    import TinymceEditor from '@/components/Tinymce/Tinymce'
    export default {
        components: {
            TinymceEditor
        },
        name: "Membercheck_card",
        data() {
            return {
                ParentName:'iamyoudad',

                msg: '',
                msg3: '',
                disabled: false
            }
        },
        methods: {
            // 鼠标单击的事件
            onClick (e, editor) {
                /*console.log('Element clicked');
                console.log(e);
                console.log(editor);*/

                let aa2 = this.msg;
                localStorage.setItem('item',aa2);

            },
            //清空内容
            clear () {
                this.$refs.editor.clear()
            },

        },

        created() {
            let bb =localStorage.getItem('item');

            console.log(bb);
            this.msg3 = bb;
        },
    }
</script>

<style lang="scss" scoped>

</style>