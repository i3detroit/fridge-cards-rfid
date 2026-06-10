<script lang="ts">
    import Icon from "@iconify/svelte";
    import Input from "../../../components/Input.svelte";
    import { enhance } from '$app/forms';
    import { userStore } from "$lib/stores.svelte";

    const { form } = $props();
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
        <Input
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
        <a
            href="/logout"
            class="button button--small"
        >
            <Icon icon="solar:logout-2-bold" />
        </a>
    </form>
</div>