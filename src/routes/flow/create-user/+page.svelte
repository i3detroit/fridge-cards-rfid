<script lang="ts">
    import Icon from "@iconify/svelte";
    import { enhance } from '$app/forms';
    import type { Action } from 'svelte/action';
    import { userStore } from "$lib/stores.svelte";

    const { form } = $props();

	const focusOnMount: Action = node => {
		$effect(() => node.focus());
    };
</script>

<div class="create-container">
    <h1>You must be new! What would you like to be called?</h1>
    {#if form?.failure}
        <p>Error occurred while creating user.</p>
    {/if}
    <form
        class="input-row"
        method="POST"
        use:enhance
    >
        <input
            use:focusOnMount
            type="text"
            name="name"
            placeholder="Name"
            required
        />
        <input
            type="hidden"
            name="id"
            value={userStore.id}
            required
        />
        <button type="submit">
            <Icon icon="solar:check-circle-bold" class="icon" />
        </button>
    </form>
</div>

<style>
    .input-row {
        width: 80%;
        display: flex;
        gap: 0.5em;
        margin-block: 1.5em;
        font-size: 1.5em;

        input {
            flex-grow: 1;
        }
    }
</style>