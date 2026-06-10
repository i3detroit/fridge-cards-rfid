<script lang="ts">
    import Icon from '@iconify/svelte';
    import { source } from 'sveltekit-sse';
    import { goto } from '$app/navigation';
    import { setUserStore } from '$lib/stores.svelte';
    import type { Users } from '@prisma-app/client';

    const data = source('/api/rfid-events').select('data');
    $effect(() => {
        if (!$data) { return; }
        const user: Users = JSON.parse($data);
        setUserStore(user);

        if (!user.name) {
            goto('/flow/create-user');
        } else {
            goto('/flow/actions');
        }
    });

    let demoSequence = $state(0);
    const incrementSequence = (i: number) => () => {
        if (demoSequence == i - 1) { demoSequence++; }
        else { demoSequence = 0; }

        if (demoSequence == 4) { fetch('/api/rfid-events/demo'); }
    };
</script>

<div class="waiting-container">
    <p>Swipe RFID key to begin.</p>
    <Icon
        class="icon"
        icon="solar:key-minimalistic-square-3-line-duotone"
        aria-hidden="true"
    />
    <div class="demo-sequence">
        <button
            onclick={incrementSequence(1)}
            aria-hidden="true"
        ></button>
        <button
            onclick={incrementSequence(2)}
            aria-hidden="true"
        ></button>
        <button
            onclick={incrementSequence(3)}
            aria-hidden="true"
        ></button>
        <button
            onclick={incrementSequence(4)}
            aria-hidden="true"
        ></button>
    </div>
</div>

<style>
    .waiting-container {
        display: flex;
        height: 100%;
        flex-direction: column;
        gap: 1em;
        text-align: center;
        align-items: center;
        justify-content: center;

        :global(.icon) {
            font-size: 2em;
        }
    }

    .demo-sequence button {
        position: absolute;
        background: none;
        width: 15%;
        aspect-ratio: 1;
        cursor: initial;

        &:nth-child(1) { inset: 0 auto auto 0; }
        &:nth-child(2) { inset: 0 0 auto auto; }
        &:nth-child(3) { inset: auto auto 0 0; }
        &:nth-child(4) { inset: auto 0 0 auto; }
    }
</style>