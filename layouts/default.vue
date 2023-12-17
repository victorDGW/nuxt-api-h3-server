<script lang="ts" setup></script>

<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <NuxtLink to="/">HOME PAGE</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blog">Blog </NuxtLink>
          </li>
          <li>menu3</li>
        </ul>
      </nav>
    </header>
    <slot />
  </div>
</template>

<style scoped>
nav {
  background-color: #ccc;
}

ul {
  display: flex;
  justify-content: space-around;
}
</style>
