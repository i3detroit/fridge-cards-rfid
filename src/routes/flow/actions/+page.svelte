<script lang="ts">
    import Icon from '@iconify/svelte';
    import { userStore } from '$lib/stores.svelte';
    import { enhance } from '$app/forms';

    const { form } = $props();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    });
    const balanceFormatted = formatter.format(userStore.balance);
</script>

<div class="actions-container">
    {#if form?.failure}
        <p>Error occurred while processing transaction.</p>
    {/if}
    <div class="header-block">
        <h1>Hi, {userStore.name}.</h1>
        <p class="balance-info">{balanceFormatted}</p>
    </div>
    <form
        class="button-grid"
        method="POST"
        action="/flow/transaction-custom"
        use:enhance
    >
        <div class="grid-row">
            <input
                type="hidden"
                name="id"
                value={userStore.id}
            />
            <input
                type="hidden"
                name="type"
                value="purchase"
            />
            <button
                type="submit"
                name="amount"
                class="button--large"
                value="0.75"
                disabled={userStore.balance < 0.75}
            >
                Buy 75¢
            </button>
            <button
                type="submit"
                name="amount"
                class="button--large"
                value="0.25"
                disabled={userStore.balance < 0.25}
            >
                Buy 25¢
            </button>
        </div>
        <div class="grid-row">
            <a
                href="/flow/transaction-custom?type=withdraw"
                class="button button--small"
            >
                Withdraw
            </a>
            <a
                href="/flow/transaction-custom?type=deposit"
                class="button button--small"
            >
                Deposit
            </a>
            <a
                href="/logout"
                class="button button--small"
            >
                <Icon icon="solar:logout-2-outline" />
            </a>
        </div>
    </form>
</div>

<style>
    .actions-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .header-block {
        display: flex;
        align-items: center;
        
        h1 {
            margin-right: auto;
        }

        .balance-info {
            font-size: 2.75em;
            font-weight: 200;
            opacity: 0.75;
        }
    }

    .button-grid {
        display: grid;
        gap: 0.75em;

        .grid-row {
            display: flex;
            gap: 0.75em;
        }

        button, 
        .button {
            width: 100%;
        }
        
        .button--large {
            font-size: 2em;
            font-weight: 600;
            min-height: 6.5rem;
            letter-spacing: -1px;
        }

        .button--small {
            font-size: 1.25em;
            min-height: 5rem;
        }
    }
</style>