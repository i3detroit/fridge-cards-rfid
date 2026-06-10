<script lang="ts">
    import { goto } from '$app/navigation';
    import { clearUserStore } from '$lib/stores.svelte';

    $effect(() => {
        clearUserStore();
        setTimeout(() => goto('/'), 4000);
    });
</script>

<div class="logout-container">
    <h1>You've been logged out.</h1>
</div>

<style>
    .logout-container {
        display: grid;
        align-items: center;
        justify-content: center;
        height: 100%;

        h1 {
            font-weight: 300;
        }
    }
</style>