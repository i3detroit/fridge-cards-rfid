<script lang="ts">
	import '../styles/reset.css';
	import '../styles/style.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Fridge Cards</title>
</svelte:head>

<div class="container">
	{@render children()}
</div>

<style>
	.container {
		position: relative;
		width: 800px;
		height: 480px;
		background: #000;
		margin: auto;
		padding: 2.75em 2em;
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
	}
</style>