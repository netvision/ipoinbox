<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="text-white" style="background-color: #201e1f;">
        <a href="/"><q-img :src="logo" style="width: 180px" /></a>
        <q-space />
          <q-btn flat icon="home" to="/" />
          <q-separator color="orange" vertical />
          <q-btn flat label="IPO" to="/sectors" />
          <q-separator color="orange" vertical />
          <q-btn flat label="Retail Investors" to="/registrars" />
          <q-separator color="orange" vertical />
          <q-btn flat label="HNI Investor" to="/brlms" />
          <q-separator color="orange" vertical />
          <q-btn flat label="Employees" to="/brlms" />
          <q-separator color="orange" vertical />
          <q-btn flat label="GMP" to="/brlms" />
          <q-separator color="orange" vertical />
          <q-btn flat label="FAQ" to="/brlms" />
       
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import logo from '../assets/logo.png'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MainLayout',
  setup () {
    return { 
      logo
    }
  }  
})
</script>
