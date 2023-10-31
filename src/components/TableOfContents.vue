<script setup lang="ts">
defineProps<{
  sections: {
    level: number;
    text: string;
    id: string;
  }[];
}>();
</script>

<template>
  <ul class="table-of-contents">
    <li v-for="(section, index) in sections" :key="index">
      <a
        :href="'#' + section.id"
        class="p1"
        :class="index === 0 ? 'active' : ''"
        :style="`margin-left: calc((${section.level} - 2) * var(--spacing-xs));`"
        >{{ section.text }}</a
      >
    </li>
  </ul>
</template>

<style scoped lang="scss">
.table-of-contents {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);
  height: max-content;
  max-height: 100%;
  background-color: var(--elevation-8);
  padding: var(--spacing-xs);
  border: 1px solid var(--elevation-7);
  border-radius: var(--radius-xs);
  overflow-y: auto;
}

.table-of-contents li a {
  padding: var(--spacing-2xs) var(--spacing-xs);
  border: 1px solid transparent;
  position: relative;
  color: var(--elevation-2);

  &.active {
    color: var(--elevation-0);

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      width: 0.5rem;
      height: 0.5rem;
      background-color: var(--elevation-6);
      border: 1px solid var(--elevation-5);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    color: var(--elevation-0);
    background-color: var(--elevation-7);
    border-color: var(--elevation-6);
    border-radius: var(--radius-xs);
  }
}
</style>
