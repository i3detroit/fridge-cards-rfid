<script lang="ts">
    import Icon from "@iconify/svelte";
    import Input from '../../../components/Input.svelte';
    import { userStore } from '$lib/stores.svelte';
    import { enhance } from "$app/forms";
    import { page } from "$app/state";

    const { form } = $props();

    const type = page.url.searchParams.get('type');
</script>

<div class="transaction-container">
    {#if form?.failure}
        <p>Error occurred while processing transaction.</p>
    {/if}
    <h1>How much would you like to { type }?</h1>
    <form
        class="input-row"
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
            placeholder="0.00"
            required
        />
        <button type="submit">
            <Icon icon="solar:check-circle-bold" class="icon" />
        </button>
        <a
            href="/flow/actions"
            class="button button--small"
        >
            <Icon icon="solar:close-circle-bold" />
        </a>
    </form>
</div>