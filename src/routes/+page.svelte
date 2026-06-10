<script lang="ts">
    import { source } from 'sveltekit-sse';

    const value = source('/event').select('message');
    $inspect(value);
</script>

<h1>Welcome to SvelteKit</h1>
<p>{$value}</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>