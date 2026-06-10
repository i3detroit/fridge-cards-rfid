<script module>
    export { formErrorMessage };
</script>

{#snippet formErrorMessage(form)}
    {#if form?.failure}
        {#if form?.message}
            <p>{form.message}</p>
        {:else}
            <p>Unknown error occurred.</p>
        {/if}
    {/if}
{/snippet}