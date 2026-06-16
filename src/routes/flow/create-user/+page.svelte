<script lang="ts">
    import Icon from "@iconify/svelte";
    import iconCheck from '@iconify-icons/ph/check-bold';
    import iconLogout from '@iconify-icons/solar/logout-2-outline';
    import Input from "$components/Input.svelte";
    import { enhance } from '$app/forms';
    import { userStore, setUserStore } from "$lib/stores.svelte";
    import { formErrorMessage } from '$lib/snippets.svelte';
    import { goto } from "$app/navigation";

    const { form } = $props();

    $effect(() => {
        if (form?.failure === false) {
            setUserStore(form.user);
            goto('/flow/actions');
        }
    });
</script>

<div class="create-container">
    <h1>You must be new! What would you like to be called?</h1>
    {@render formErrorMessage(form)}
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
            <Icon icon={iconCheck} class="icon" />
        </button>
        <a
            href="/logout"
            class="button button--small"
        >
            <Icon icon={iconLogout} />
        </a>
    </form>
</div>