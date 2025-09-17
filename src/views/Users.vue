<template>
    <span v-for="user in users">
        {{user.id}}
    </span>
</template>

<script setup>
    import {ref, onMounted} from 'vue'
    import api from '../services/api'

    const admins = ref([])
    const teachers = ref([])
    const students = ref([])

    const fetchUsers = async()=> {
        try {
            const [adminsRes, teachersRes, studentsRes] = await Promise.all([
                api.get('/admins'),
                api.get('/teachers'),
                api.get('/students')
            ])

            admins.value = Array.isArray(adminsRes.data) ? adminsRes.data : adminsRes.data.data || []
            teachers.value = Array.isArray(teachersRes.data) ? teachersRes.data : teachersRes.data.data || []
            students.value = Array.isArray(studentsRes.data) ? studentsRes.data : studentsRes.data.data || []

            console.log(admins.value)
            console.log(teachers.value)
            console.log(students.value)
        } catch (err) {
            console.log(err)
        }
    }
    onMounted(fetchUsers)
</script>