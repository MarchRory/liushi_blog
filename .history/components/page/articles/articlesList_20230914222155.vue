<script lang="ts">
import { contentLoadAnimation } from '../../../utils/gaspAnimation/cardPreLoad'
export default {
    props: {
        articles: {
            type: Array as any,
            required: true,
            default: []
        },
        tag: {
            type: String,
        }
    },
    setup(props) {

    },
    watch: {

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