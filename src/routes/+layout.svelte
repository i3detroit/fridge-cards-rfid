<script lang="ts">
	import '../styles/reset.css';
	import '../styles/style.css';

	let { children } = $props();
</script>

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
		padding: 2em;
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
	}
</style>