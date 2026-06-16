<script lang="ts">
    import Icon from '@iconify/svelte';
    import iconCheckFill from '@iconify-icons/ph/check-circle-fill';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import { userStore, clearUserStore } from '$lib/stores.svelte';

    const { type, amount } = Object.fromEntries(
        page.url.searchParams.entries()
    );

    const timeout = setTimeout(() => { clearUserStore(); goto('/') }, 5000);
    const disableTimeout = () => clearTimeout(timeout);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    });
    const [ amountFormatted, balanceFormatted ] =
        [ amount, userStore.balance ].map(value => formatter.format(parseFloat(value)));
</script>

<div class="confirmation-container">
    <Icon
        icon={iconCheckFill}
        class="icon"
    />
    <h1>Come again soon!</h1>
    {#if type == "purchase"}
        <p>You purchased an item for {amountFormatted} and your balance is now {balanceFormatted}.</p>
    {:else if type == "deposit"}
        <p>You deposited {amountFormatted} and your balance is now {balanceFormatted}. Don't forget to drop your cash in the box!</p>
    {:else if type == "withdraw"}
        <p>You withdrew {amountFormatted} and your balance is now {balanceFormatted}. Don't forget to take your cash from the box!</p>
    {/if}
    <a
        href="/flow/actions"
        class="button"
        onclick={ disableTimeout }
    >
        New Transaction
    </a>
</div>

<style>
    .confirmation-container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-inline: auto;
        max-width: 30rem;
        height: 100%;

        h1 {
            font-size: 1.5rem;
        }

        :global(.icon) {
            font-size: 3em;
        }

        .button {
            margin-top: 1em;
        }
    }
</style>