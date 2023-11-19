<script lang="ts">
import { contentLoadAnimation } from '../../../utils/gaspAnimation/cardPreLoad'
import { toRefs } from 'vue'
export default {
    props: {
        articles: {
            type: Array as any,
            required: true,
            default: []
        },
        // 文章类型
        tag: {
            type: String,
        }
    },
    setup(props) {
        const { articles, tag } = toRefs(props)
        return {
            articles, tag
        }
    },
    watch: {
        tag: {
            handler(newr, older) {

            }
        }
    },
    onMounted() {
        contentLoadAnimation()
    },
}



</script>
<template>
    <div>

    </div>
</template>

<style scoped></style>