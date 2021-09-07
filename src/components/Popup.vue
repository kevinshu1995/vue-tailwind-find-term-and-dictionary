<template>
    <dialog open :class="['absolute left-0 top-full transfrom-y-full p-0 bg-transparent']">
        <Card padding="p-6" bg="bg-gray" class="text-white w-80 space-y-2">
            <header class="space-y-1">
                <h2 class="font-bold text-xl">
                    <slot name="word"></slot>
                </h2>
                <p class="space-x-3 text-xs">
                    <slot name="phonetic"></slot>
                </p>
            </header>
            <main class="space-y-4">
                <div class="flex">
                    <h3 class="font-bold flex-grow">meanings</h3>
                    <div class="flex items-center gap-2">
                        <button @click="onPageChange(-1)">
                            <img
                                src="../assets/icon/PolygonLeft.svg"
                                alt="Navigate to previous meaning"
                            />
                        </button>
                        <span class="font-bold text-sm">
                            {{ currentPage + 1 }} / {{ pageContents.length }}
                        </span>
                        <button @click="onPageChange(1)">
                            <img
                                src="../assets/icon/PolygonRight.svg"
                                alt="Navigate to next meaning"
                            />
                        </button>
                    </div>
                </div>
                <ul>
                    <li
                        v-for="(mean, i) in pageContents"
                        :key="`pageContent-${i}`"
                        class="space-y-2"
                        v-show="currentPage === i"
                    >
                        <slot name="pageContent" :mean="mean"></slot>
                    </li>
                </ul>
            </main>
        </Card>
    </dialog>
</template>

<script>
import { ref } from "vue";
import Card from "./Card.vue";
export default {
    name: "Popup",
    components: {
        Card,
    },
    props: {
        pageContents: {
            type: Array,
            default: [],
        },
    },
    emits: ["onPrevPage", "onNextPage"],
    setup({ pageContents }) {
        const currentPage = ref(0);

        function onPageChange(step) {
            currentPage.value = Math.min(
                Math.max(currentPage.value + step, 0),
                pageContents.length - 1
            );
        }

        return { currentPage, onPageChange };
    },
};
</script>
