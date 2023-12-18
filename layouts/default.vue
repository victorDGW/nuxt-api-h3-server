<script lang="ts" setup>
import "@unocss/reset/tailwind.css";
import "uno.css";

</script>

<template>
  <div>
    <header>
      <nav class="sticky-element">
        <ul>
          <li>
            <NuxtLink to="/">HOME PAGE</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blog">Blog </NuxtLink>
          </li>
          <li>Non attribué</li>
        </ul>
      </nav>
    </header>
    <slot />
  </div>
</template>

<style scoped>
nav {
  background-color: #ecedee;


}

.sticky-element {
  position: -webkit-sticky;
  /* Pour la compatibilité avec Safari/IOS */
  position: sticky;
  top: 20px;
}

ul {
  display: flex;
  justify-content: space-around;

}

li {
  padding: 1rem;
  transition: all 0.2s;
}

li:hover {
  cursor: pointer;
  color: #60a4f8;
}
</style>
