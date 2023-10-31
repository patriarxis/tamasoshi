import { contentHTML, headings } from "./App.vue";

onMounted(() => {
const parser = new DOMParser();
const htmlDoc = parser.parseFromString(contentHTML.value, "text/html");
const headingElements = htmlDoc.querySelectorAll("h2, h3, h4, h5, h6");

headings = Array.from(headingElements).map((heading) => ({
level: parseInt(heading.tagName.charAt(1)),
text: heading.innerText,
id: heading.id,
}));
});
