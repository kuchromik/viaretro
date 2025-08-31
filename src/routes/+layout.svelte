<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

{@render children?.()}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		scroll-behavior: smooth;
	}

	:global(body) {
		background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
		color: #495057;
		line-height: 1.6;
		min-height: 100vh;
	}

	:global(:root) {
		--primary-yellow: #ffd60a;
		--secondary-yellow: #ffbe0b;
		--dark-yellow: #fb8500;
		--soft-grey: #6c757d;
		--light-grey: #f8f9fa;
		--dark-grey: #495057;
		--white: #ffffff;
		--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
</style>
