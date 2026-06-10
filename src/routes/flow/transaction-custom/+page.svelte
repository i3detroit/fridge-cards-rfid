<script lang="ts">
    import Icon from "@iconify/svelte";
    import Input from '$components/Input.svelte';
    import { userStore, setUserStore } from '$lib/stores.svelte';
    import { formErrorMessage } from '$lib/snippets.svelte';
    import { enhance } from "$app/forms";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    const { form } = $props();

    const type = page.url.searchParams.get('type');

    $effect(() => {
        if (form?.failure === false) {
            const { type, amount } = form.transaction;
            setUserStore(form.user);

            const urlParams = new URLSearchParams({ type, amount });
            goto(`/flow/confirmation?${urlParams}`);
        }
    });
</script>

<div class="transaction-container">
    <h1>How much would you like to { type }?</h1>
    {@render formErrorMessage(form)}
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
            <Icon icon="ph:check-bold" class="icon" />
        </button>
        <a
            href="/flow/actions"
            class="button button--small"
        >
            <Icon icon="ph:x-bold" />
        </a>
    </form>
</div>