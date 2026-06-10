<script lang="ts">
    import { goto } from '$app/navigation';
    import { clearUserStore } from '$lib/stores.svelte';

    $effect(() => {
        clearUserStore();
        setTimeout(() => goto('/'), 4000);
    });
</script>

<div class="confirmation-container">
    <h1>Come again soon!</h1>
</div>

<style>
    .confirmation-container {
        display: grid;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>