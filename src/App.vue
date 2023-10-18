<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="main">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/signin">SignIn</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
  </div>
  <RouterView />
</template>

<style scoped lang="scss">
/* Color Theme Swatches in Hex */
$mutedPink-hex: #F2BDC7;
$darkPink-hex: #F288AF;
$mutedBlue-hex: #59D9CC;
$darkBrown: #4C393B;
$brightYellow: #FFEA70;
$heading-color: #30382d;

header {
  line-height: 1.5;
  
}


nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  position: relative;
  z-index: 2;
  
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

// @media (min-width: 1024px) {
//   header {
//     display: flex;
//     place-items: center;
    
//   }

//   .logo {
//     margin: 0 2rem 0 0;
//   }

//   header .wrapper {
//     display: flex;
//     place-items: flex-start;
//     flex-wrap: wrap;
//   }

//   nav {
//     text-align: left;
//     margin-left: -1rem;
//     font-size: 1rem;
//     padding: 1rem 0;
//     margin-top: 1rem;
//   }
// }
</style>
