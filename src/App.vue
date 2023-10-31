<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import MarkdownIt from "markdown-it";
import MarkdownItAttrs from "markdown-it-attrs";
import Markdown from "./components/Markdown.vue";
import TableOfContents from "./components/TableOfContents.vue";

const md = new MarkdownIt();

md.use(MarkdownItAttrs, {
  allowedAttributes: [],
});

const mdSrc = "whitepaper.md";
const content = ref("");
const contentHTML = ref("");

let sections: Array<{
  level: number;
  text: string;
  id: string;
}> = [];

onMounted(() => {
  axios
    .get(mdSrc)
    .then((response) => {
      content.value = response.data;
      contentHTML.value = md.render(content.value);
      findSections();
    })
    .catch((error) => {
      console.error("Error loading Markdown file:", error);
    });
});

const findSections = () => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(contentHTML.value, "text/html");
  const headings = htmlDoc.querySelectorAll("h2, h3, h4, h5, h6");

  sections = Array.from(headings).map((heading) => ({
    level: parseInt(heading.tagName.charAt(1)),
    text: (heading as HTMLElement).innerText,
    id: heading.id,
  }));
};
</script>

<template>
  <section class="whitepaper">
    <div class="content">
      <p class="p2 date-modified">Page last updated: Oct 31, 2023</p>
      <Markdown :src="contentHTML" class="markdown" />
    </div>
    <TableOfContents :sections="sections" class="table-of-contents" />
  </section>
</template>

<style scoped>
.whitepaper {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-4xl);
  padding: var(--spacing-2xl);
}

.date-modified {
  width: max-content;
  padding: var(--spacing-2xs) var(--spacing-xs);
  border: 1px solid transparent;
  background-color: var(--elevation-8);
  border-color: var(--elevation-7);
  border-radius: var(--radius-xs);
}

.content {
  flex-grow: 1;
  height: max-content;
}

.table-of-contents {
  flex-shrink: 0;
  width: 20rem;
  position: sticky;
  top: var(--spacing-md);
  bottom: var(--spacing-md);
}
</style>
