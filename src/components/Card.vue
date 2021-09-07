<template>
    <div :class="['rounded-2xl shadow-card', padding, bg]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        padding: {
            type: String,
            default: "py-9 px-8",
        },
        bg: {
            type: String,
            default: "bg-white",
        },
    },
};
</script>
