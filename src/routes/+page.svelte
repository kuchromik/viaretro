<script>
	import { onMount } from 'svelte';
	import { user, loading } from '$lib/firebase.js';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import Dashboard from '$lib/components/Dashboard.svelte';
	
	let headerVisible = false;
	let contentVisible = false;
	let buttonVisible = false;
	let loginModal;

	onMount(() => {
		// Staggered animations
		setTimeout(() => headerVisible = true, 100);
		setTimeout(() => contentVisible = true, 300);
		setTimeout(() => buttonVisible = true, 500);
	});

	function handleLogin() {
		loginModal?.openModal();
	}

	function handleLoginSuccess() {
		// You can add any post-login logic here
		console.log('User logged in successfully');
		console.log('User data:', $user);
	}

	function handleLogoutSuccess() {
		// You can add any post-logout logic here
		console.log('User logged out successfully');
	}
</script>

<svelte:head>
	<title>viaintern - Welcome</title>
	<meta name="description" content="Modern and responsive viaintern application" />
</svelte:head>

<main class="container">
	<header class="header" class:visible={headerVisible}>
		<h1 class="title">viaretro</h1>
	</header>

	<section class="content" class:visible={contentVisible}>
		<div class="card">
			<h2>Welcome to the Past</h2>
			<p>
				Take a look at what has happened in recent years. Remember past concerts and performances.
			</p>
		</div>
	</section>

	<div class="login-section" class:visible={buttonVisible}>
		{#if $loading}
			<div class="loading-spinner">
				<div class="spinner"></div>
				<p>Loading...</p>
			</div>
		{:else if $user}
			<div class="welcome-message">
				<h3>Welcome back, {$user.displayName || 'User'}! 🎉</h3>
				<p>You're successfully logged in.</p>
			</div>
			<LoginModal 
				bind:this={loginModal}
				on:loginSuccess={handleLoginSuccess}
				on:logoutSuccess={handleLogoutSuccess}
			/>
		{:else}
			<button class="login-button" on:click={handleLogin}>
				<span class="button-text">Login</span>
				<span class="button-arrow">→</span>
			</button>
			<p class="login-hint">Horst has the access data.</p>
			<LoginModal 
				bind:this={loginModal}
				on:loginSuccess={handleLoginSuccess}
				on:logoutSuccess={handleLogoutSuccess}
			/>
		{/if}
	</div>
</main>

<!-- Show Dashboard when user is logged in -->
{#if $user}
	<Dashboard />
{/if}

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
	}

	.header {
		text-align: center;
		opacity: 0;
		transform: translateY(-30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.header.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.title {
		font-size: clamp(3rem, 8vw, 6rem);
		font-weight: 700;
		background: linear-gradient(135deg, var(--primary-yellow), var(--dark-yellow));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
		text-shadow: 0 4px 8px rgba(255, 214, 10, 0.3);
	}

	.subtitle {
		font-size: 1.25rem;
		color: var(--soft-grey);
		font-weight: 300;
		letter-spacing: 0.5px;
	}

	.content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		transition-delay: 0.2s;
	}

	.content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.card {
		background: var(--white);
		padding: 2.5rem;
		border-radius: 20px;
		box-shadow: var(--shadow-lg);
		margin-bottom: 3rem;
		border: 1px solid rgba(255, 214, 10, 0.1);
	}

	.card h2 {
		color: var(--dark-grey);
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		position: relative;
	}

	.card h2::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 0;
		width: 60px;
		height: 3px;
		background: linear-gradient(90deg, var(--primary-yellow), var(--secondary-yellow));
		border-radius: 2px;
	}

	.card p {
		color: var(--soft-grey);
		font-size: 1.1rem;
		margin-bottom: 1.5rem;
		line-height: 1.7;
	}

	

	.login-section {
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		transition-delay: 0.4s;
	}

	.login-section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.login-button {
		background: linear-gradient(135deg, var(--primary-yellow), var(--secondary-yellow));
		color: var(--dark-grey);
		font-size: 1.2rem;
		font-weight: 600;
		padding: 1rem 3rem;
		border: none;
		border-radius: 50px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: var(--shadow);
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		position: relative;
		overflow: hidden;
	}

	.login-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: left 0.5s ease;
	}

	.login-button:hover::before {
		left: 100%;
	}

	.login-button:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		background: linear-gradient(135deg, var(--secondary-yellow), var(--dark-yellow));
	}

	.login-button:active {
		transform: translateY(0);
	}

	.button-arrow {
		transition: transform 0.3s ease;
	}

	.login-button:hover .button-arrow {
		transform: translateX(5px);
	}

	.login-hint {
		color: var(--soft-grey);
		font-size: 1rem;
		font-weight: 300;
	}

	.loading-spinner {
		text-align: center;
		color: var(--soft-grey);
	}

	.loading-spinner .spinner {
		width: 40px;
		height: 40px;
		border: 3px solid #f3f3f4;
		border-top: 3px solid var(--primary-yellow);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.welcome-message {
		text-align: center;
		padding: 2rem;
		background: var(--white);
		border-radius: 16px;
		box-shadow: var(--shadow);
		border: 1px solid rgba(255, 214, 10, 0.2);
		margin-bottom: 2rem;
	}

	.welcome-message h3 {
		color: var(--dark-grey);
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, var(--primary-yellow), var(--dark-yellow));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.welcome-message p {
		color: var(--soft-grey);
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.card {
			padding: 1.5rem;
		}



		.login-button {
			padding: 0.875rem 2.5rem;
			font-size: 1.1rem;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0.5rem;
		}

		.title {
			font-size: 3rem;
		}

		.card {
			padding: 1rem;
		}
	}
</style>
