<template>
    <div>
        <h1>User</h1>
<!--        <div>
            <p>Name: {{ user.name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Password: {{ user.password }}</p>
        </div>-->
    </div>
</template>

<script setup>

// use pinia
import {useAuthStore} from "../store/auth";
import {storeToRefs} from "pinia";

const authStore = useAuthStore()

const { authUser } =  storeToRefs(authStore)


</script>

<style scoped></style>
