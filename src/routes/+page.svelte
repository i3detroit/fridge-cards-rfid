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
</script>

<div class="waiting-container">
    <p>Swipe RFID key to begin.</p>
    <Icon
        class="icon"
        icon="solar:key-minimalistic-square-3-line-duotone"
        aria-hidden="true"
    />
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
</style>