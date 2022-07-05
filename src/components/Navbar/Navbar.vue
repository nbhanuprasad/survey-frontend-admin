<template>
  <div class="navbar">
    <div class="navbar__left">
      <router-link class="navbar__logo" to="/">SURVEY</router-link>
    </div>
    <div class="navbar__right">
      <router-link class="navbar__right--link" to="/surveys">SURVEYS</router-link>
      <router-link class="navbar__right--link" to="/create-admin">CREATE ADMIN</router-link>
      <button class="button__black logout__button">Sign Out</button>
    </div>
  </div>
</template>