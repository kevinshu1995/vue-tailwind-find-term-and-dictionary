<template>
    <div class="flex flex-col mx-auto justify-center min-h-screen max-w-3xl px-4 gap-9">
        <header>
            <h1 class="font-bold text-2xl text-gray-dark">Find Term and Dictionary</h1>
        </header>
        <main class="flex flex-col gap-6">
            <form>
                <Card padding="px-8 py-6" class="flex gap-2">
                    <img src="./assets/icon/CombinedShape.svg" alt="Search Icon" />
                    <div class="relative flex-grow text-lg">
                        <label
                            for="search"
                            :class="[
                                'absolute left-2 inset-y-0 w-full flex items-center',
                                'pointer-events-none overflow-hidden',
                                'text-gray-darker',
                                searchText && 'sr-only',
                            ]"
                        >
                            Search the term in article
                        </label>
                        <input
                            v-model="searchText"
                            class="w-full p-2"
                            type="search"
                            id="search"
                            name="search"
                        />
                    </div>
                </Card>
            </form>
            <article>
                <Card>
                    <p>
                        <span v-html="formatedArticle[0]"></span>
                        <span class="relative" v-if="isSearchingMatch">
                            <span v-html="formatedArticle[1]"></span>
                            <Popup
                                v-if="
                                    formatedArticle[1] &&
                                    isSearchingMatch &&
                                    Object.keys(dictionary.data).length !== 0
                                "
                                :pageContents="dictionary.data.meanings"
                            >
                                <template #word>{{ dictionary.data.word }}</template>
                                <template #phonetic>
                                    <span
                                        v-for="(phonetic, i) in dictionary.data.phonetics"
                                        :key="`phonetic-${i}`"
                                    >
                                        /{{ phonetic.text }}/
                                    </span>
                                </template>
                                <template #pageContent="{ mean }">
                                    <p class="text-sm">{{ mean.partOfSpeech }}</p>
                                    <div
                                        v-for="(definition, j) in mean.definitions"
                                        :key="`definition-${j}`"
                                        class="space-y-2"
                                    >
                                        <p class="text-sm">
                                            {{ definition.definition }}
                                        </p>
                                        <p class="text-sm">
                                            {{ definition.example }}
                                        </p>
                                    </div>
                                </template>
                            </Popup>
                        </span>
                        <span v-html="formatedArticle[2]"></span>
                    </p>
                </Card>
            </article>
        </main>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from "vue";
import Card from "./components/Card.vue";
import Popup from "./components/Popup.vue";
import { debounce } from "./helper";

export default {
    name: "App",
    components: {
        Card,
        Popup,
    },
    setup() {
        const searchText = ref("");
        const originArticle = ref("");
        const dictionary = reactive({ data: {} });

        const isSearchingMatch = computed(() => {
            return searchText.value !== "" && originArticle.value.includes(searchText.value);
        });

        onMounted(() => {
            fetch("/article.json")
                .then(res => res.json())
                .then(res => (originArticle.value = res.articles[0]));
        });

        watch(
            searchText,
            debounce(searchText => getDictionary(searchText), 1000)
        );

        async function getDictionary(word) {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (res.ok) {
                const data = await res.json();
                dictionary.data = data[0];
            }
        }

        const formatedArticle = computed(() => {
            let result = [];
            if (isSearchingMatch) {
                const templateClass = "bg-gray-darker text-white";
                const template = `<span class="${templateClass}">${searchText.value}</span>`;

                const [first, ...rest] = originArticle.value.split(searchText.value);
                result = [first, template, rest.join(template)];
            } else {
                result = [originArticle.value];
            }
            return result;
        });

        return { searchText, formatedArticle, isSearchingMatch, dictionary };
    },
};
</script>
