

<template> 
  <div class="main ">
    
    <header>
      <div class="wrapper">
        
        <nav class="relative ">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/signin">SignIn</RouterLink>
          <RouterLink to="/adminpanel">About</RouterLink>
          
          <DarkModeSwitch />
          
         
        </nav>
      </div>
    </header>
  </div>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'




</script>

<style scoped lang="scss">


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
  color: var(--color-text-active);
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
