<script lang="ts">
    import Input from '../../../components/Input.svelte';
    import { userStore } from '$lib/stores.svelte';
    import { enhance } from "$app/forms";
    import { page } from "$app/state";

    const { form } = $props();

    const type = page.url.searchParams.get('type');
    const typeFormatted = type.charAt(0).toUpperCase() + type.slice(1);
</script>

<div class="transaction-container">
    {#if form?.failure}
        <p>Error occurred while processing transaction.</p>
    {/if}
    <h1>{ typeFormatted }</h1>
    <a href="/flow/actions">
        Back
    </a>
    <form
        method="POST"
        use:enhance
    >
        <input
            type="hidden"
            name="id"
            value={userStore.id}
        />
        <Input
            type="number"
            name="amount"
            min="0"
            max="50"
            step="0.01"
            required
        />
        <button type="submit">
            Submit
        </button>
    </form>
</div>

<style>
    .transaction-container {
        input {
            width: 100%;
        }
    }
</style>