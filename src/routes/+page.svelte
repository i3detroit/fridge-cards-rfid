<script lang="ts">
    import Icon from '@iconify/svelte';
    import { source } from 'sveltekit-sse';

    const value = source('/scan').select('message');
</script>

<div class="waiting-container">
    <p>{$value}</p>
    <p>Swipe RFID key to begin.</p>
    <Icon
        class="icon"
        icon="solar:key-minimalistic-square-3-line-duotone"
        aria-hidden="true"
    />
    <Icon
        class="icon"
        icon="solar:alt-arrow-down-linear"
        aria-hidden="true"
    />
</div>

<style>
    .waiting-container {
        display: flex;
        height: 100%;
        flex-direction: column;
        gap: 0.5em;
        text-align: center;
        align-items: center;
        justify-content: end;

        p {
            margin-block: 1em;
        }

        :global(.icon) {
            font-size: 2em;
        }
    }
</style>