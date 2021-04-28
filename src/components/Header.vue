<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #end>
            <b-navbar-item href="#">
                Expiry Tracker
            </b-navbar-item>
            <b-navbar-item href="#">
                Shopping List
            </b-navbar-item>
            <b-navbar-item href="#">
                Stats
            </b-navbar-item>
        </template>

    </b-navbar>
</template>