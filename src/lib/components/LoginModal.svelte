<script>
	import { user, loading, signInWithGoogle, signOutUser, signInWithEmail, createUserWithEmail } from '$lib/firebase.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let showModal = false;
	let isLoading = false;
	let errorMessage = '';
	let isSignUp = false;
	
	// Form fields
	let email = '';
	let password = '';
	let confirmPassword = '';
	let displayName = '';

	export function openModal() {
		showModal = true;
		errorMessage = '';
		resetForm();
	}

	export function closeModal() {
		showModal = false;
		errorMessage = '';
		resetForm();
	}

	function resetForm() {
		email = '';
		password = '';
		confirmPassword = '';
		displayName = '';
		isSignUp = false;
	}

	function toggleMode() {
		isSignUp = !isSignUp;
		errorMessage = '';
		password = '';
		confirmPassword = '';
	}

	async function handleGoogleSignIn() {
		isLoading = true;
		errorMessage = '';
		try {
			await signInWithGoogle();
			closeModal();
			dispatch('loginSuccess');
		} catch (error) {
			errorMessage = 'Failed to sign in with Google. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	async function handleEmailAuth() {
		if (!email || !password) {
			errorMessage = 'Please fill in all required fields.';
			return;
		}

		if (isSignUp) {
			if (password !== confirmPassword) {
				errorMessage = 'Passwords do not match.';
				return;
			}
			if (password.length < 6) {
				errorMessage = 'Password must be at least 6 characters long.';
				return;
			}
			if (!displayName.trim()) {
				errorMessage = 'Please enter your name.';
				return;
			}
		}

		isLoading = true;
		errorMessage = '';
		
		try {
			if (isSignUp) {
				await createUserWithEmail(email, password, displayName.trim());
			} else {
				await signInWithEmail(email, password);
			}
			closeModal();
			dispatch('loginSuccess');
		} catch (error) {
			console.error('Authentication error:', error);
			switch (error.code) {
				case 'auth/email-already-in-use':
					errorMessage = 'An account with this email already exists.';
					break;
				case 'auth/weak-password':
					errorMessage = 'Password is too weak. Please choose a stronger password.';
					break;
				case 'auth/invalid-email':
					errorMessage = 'Please enter a valid email address.';
					break;
				case 'auth/user-not-found':
					errorMessage = 'No account found with this email address.';
					break;
				case 'auth/wrong-password':
					errorMessage = 'Incorrect password. Please try again.';
					break;
				case 'auth/too-many-requests':
					errorMessage = 'Too many failed attempts. Please try again later.';
					break;
				default:
					errorMessage = isSignUp ? 'Failed to create account. Please try again.' : 'Failed to sign in. Please try again.';
			}
		} finally {
			isLoading = false;
		}
	}

	async function handleSignOut() {
		try {
			await signOutUser();
			dispatch('logoutSuccess');
		} catch (error) {
			console.error('Sign out error:', error);
		}
	}

	function handleBackdropClick(event) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}
</script>

{#if showModal}
	<div class="modal-backdrop" on:click={handleBackdropClick} role="dialog" tabindex="-1">
		<div class="modal">
			<div class="modal-header">
				<h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
				<button class="close-button" on:click={closeModal} aria-label="Close">×</button>
			</div>
			
			<div class="modal-body">
				<p class="modal-description">
					{isSignUp 
						? 'Create your viaintern account to get started.' 
						: 'Sign in to access your personalized dashboard and explore all features.'}
				</p>

				{#if errorMessage}
					<div class="error-message">
						{errorMessage}
					</div>
				{/if}

				<form on:submit|preventDefault={handleEmailAuth} class="auth-form">
					{#if isSignUp}
						<div class="form-group">
							<label for="displayName">Full Name</label>
							<input
								id="displayName"
								type="text"
								bind:value={displayName}
								placeholder="Enter your full name"
								disabled={isLoading}
								required
							/>
						</div>
					{/if}

					<div class="form-group">
						<label for="email">Email Address</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder="Enter your email"
							disabled={isLoading}
							required
						/>
					</div>

					<div class="form-group">
						<label for="password">Password</label>
						<input
							id="password"
							type="password"
							bind:value={password}
							placeholder="Enter your password"
							disabled={isLoading}
							required
						/>
					</div>

					{#if isSignUp}
						<div class="form-group">
							<label for="confirmPassword">Confirm Password</label>
							<input
								id="confirmPassword"
								type="password"
								bind:value={confirmPassword}
								placeholder="Confirm your password"
								disabled={isLoading}
								required
							/>
						</div>
					{/if}

					<button 
						type="submit"
						class="email-auth-button" 
						disabled={isLoading}
					>
						{#if isLoading}
							<div class="spinner"></div>
						{:else}
							{isSignUp ? '📝' : '🔑'}
						{/if}
						{isSignUp ? 'Create Account' : 'Sign In'}
					</button>
				</form>

				<div class="divider">
					<span>or</span>
				</div>

				<button 
					class="google-button" 
					on:click={handleGoogleSignIn}
					disabled={isLoading}
				>
					{#if isLoading}
						<div class="spinner"></div>
					{:else}
						<svg class="google-icon" viewBox="0 0 24 24">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
					{/if}
					Continue with Google
				</button>

				<div class="auth-toggle">
					<span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
					<button type="button" class="toggle-button" on:click={toggleMode} disabled={isLoading}>
						{isSignUp ? 'Sign In' : 'Sign Up'}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- User Profile Display -->
{#if $user}
	<div class="user-profile">
		<div class="user-info">
			<div class="user-details">
				<span class="user-email">{$user.email}</span>
			</div>
		</div>
		<button class="logout-button" on:click={handleSignOut}>
			Sign Out
		</button>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		backdrop-filter: blur(5px);
	}

	.modal {
		background: var(--white);
		border-radius: 20px;
		box-shadow: var(--shadow-lg);
		width: 90%;
		max-width: 450px;
		max-height: 90vh;
		overflow-y: auto;
		animation: modalSlideIn 0.3s ease-out;
	}

	@keyframes modalSlideIn {
		from {
			opacity: 0;
			transform: translateY(-20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.modal-header {
		padding: 2rem 2rem 1rem;
		border-bottom: 1px solid #f1f3f4;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-header h2 {
		color: var(--dark-grey);
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
	}

	.close-button {
		background: none;
		border: none;
		font-size: 2rem;
		color: var(--soft-grey);
		cursor: pointer;
		padding: 0;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background: #f1f3f4;
		color: var(--dark-grey);
	}

	.modal-body {
		padding: 1rem 2rem 2rem;
	}

	.modal-description {
		color: var(--soft-grey);
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.error-message {
		background: #fee;
		color: #c33;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		border: 1px solid #fcc;
	}

	.login-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--dark-grey);
	}

	.form-group input {
		padding: 0.75rem 1rem;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
		background: var(--white);
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--primary-yellow);
		box-shadow: 0 0 0 3px rgba(255, 214, 10, 0.1);
	}

	.form-group input:disabled {
		background: #f8f9fa;
		cursor: not-allowed;
	}

	.email-auth-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, var(--primary-yellow), var(--secondary-yellow));
		border: 2px solid var(--secondary-yellow);
		border-radius: 12px;
		color: var(--dark-grey);
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
		overflow: hidden;
	}

	.email-auth-button:hover:not(:disabled) {
		background: linear-gradient(135deg, var(--secondary-yellow), var(--dark-yellow));
		transform: translateY(-1px);
		box-shadow: var(--shadow-lg);
	}

	.email-auth-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none !important;
	}

	.google-button, .demo-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.875rem 1.5rem;
		border: 2px solid #e1e5e9;
		border-radius: 12px;
		background: var(--white);
		color: var(--dark-grey);
		font-weight: 500;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
		overflow: hidden;
	}

	.google-button:hover {
		border-color: #4285F4;
		box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
	}

	.demo-button {
		background: linear-gradient(135deg, var(--primary-yellow), var(--secondary-yellow));
		border-color: var(--secondary-yellow);
		color: var(--dark-grey);
	}

	.demo-button:hover {
		background: linear-gradient(135deg, var(--secondary-yellow), var(--dark-yellow));
		transform: translateY(-1px);
	}

	.google-button:disabled, .demo-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none !important;
	}

	.google-icon {
		width: 20px;
		height: 20px;
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 2px solid #f3f3f3;
		border-top: 2px solid var(--primary-yellow);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.divider {
		text-align: center;
		position: relative;
		margin: 0.5rem 0;
	}

	.divider::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		background: #e1e5e9;
	}

	.divider span {
		background: var(--white);
		color: var(--soft-grey);
		padding: 0 1rem;
		font-size: 0.9rem;
	}

	.demo-note {
		margin-top: 1.5rem;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 8px;
		font-size: 0.85rem;
		color: var(--soft-grey);
		line-height: 1.5;
	}

	.auth-toggle {
		text-align: center;
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid #e1e5e9;
	}

	.auth-toggle span {
		color: var(--soft-grey);
		font-size: 0.9rem;
		margin-right: 0.5rem;
	}

	.toggle-button {
		background: none;
		border: none;
		color: var(--primary-yellow);
		font-weight: 600;
		font-size: 0.9rem;
		cursor: pointer;
		text-decoration: underline;
		transition: color 0.2s ease;
	}

	.toggle-button:hover:not(:disabled) {
		color: var(--dark-yellow);
	}

	.toggle-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.user-profile {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: var(--white);
		border-radius: 12px;
		box-shadow: var(--shadow);
		margin-top: 1rem;
		border: 1px solid rgba(255, 214, 10, 0.1);
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.user-details {
		display: flex;
		flex-direction: column;
	}

	.user-name {
		font-weight: 600;
		color: var(--dark-grey);
		font-size: 0.9rem;
	}

	.user-email {
		font-size: 0.8rem;
		color: var(--soft-grey);
	}

	.logout-button {
		padding: 0.5rem 1rem;
		background: transparent;
		border: 1px solid var(--soft-grey);
		border-radius: 8px;
		color: var(--soft-grey);
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.logout-button:hover {
		background: var(--soft-grey);
		color: var(--white);
	}

	@media (max-width: 480px) {
		.modal {
			margin: 1rem;
		}

		.modal-header, .modal-body {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}

		.user-profile {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}

		.form-group input {
			padding: 0.625rem 0.875rem;
			font-size: 0.95rem;
		}

		.email-auth-button, .google-button {
			padding: 0.75rem 1.25rem;
			font-size: 0.95rem;
		}
	}
</style>
