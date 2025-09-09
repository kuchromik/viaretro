<script>
	import { user } from '$lib/firebase.js';
</script>

{#if $user}
	<div class="dashboard">
		
		<div class="video-section">
			<!--
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Juli 2025 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload">
					<source src="/api/video/ums2025" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>

			</div>
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Januar 2025 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload" poster="sak2025poster.png">
					<source src="/api/video/sak2025" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>
			</div>
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Juni 2024 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload">
					<source src="/api/video/ums2024" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>
			</div>
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Januar 2024 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload" poster="sak2024poster.png">
					<source src="/api/video/sak2024" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>
			</div>
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Juni 2023 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload" poster="ums2023poster.png">
					<source src="/api/video/ums2023" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>
			</div>
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Januar 2023 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload" poster="lordofthedance_poster.png">
					<source src="/api/video/sak2023_1" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>
			</div>
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Januar 2023 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload" poster="thegreatestshowman_poster.png">
					<source src="/api/video/sak2023_2" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>
			</div>
			-->
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Sommer 2022 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload" poster="sommerfest2022poster.png">
					<source src="/netlify/functions/video-2022" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>
			</div>
			<!--
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Herbst 2021 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload" poster="poetry2021poster.png">
					<source src="/api/video/poetry2021" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>
			</div>
			<div class="video-card">
				<div class="video-header">
					<span class="video-icon">Sommer 2021 🎬</span>
				</div>
				<video width="100%" height="auto" controls controlsList="nodownload" poster="topten2021poster.png">
					<source src="/api/video/topten2021" type="video/mp4" />
					<track kind="captions" src="captions.vtt" srclang="de" label="Deutsch" />
					Dein Browser unterstützt das Video-Tag nicht.
				</video>
			</div>
			-->
		</div>
	</div>
{/if}

<style>
	.dashboard {
		max-width: 1200px;
		margin: 2rem auto;
		padding: 0 2rem;
	}

	.video-section {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.video-card {
		background: var(--white);
		padding: 2.5rem;
		border-radius: 20px;
		box-shadow: var(--shadow-lg);
		border: 1px solid rgba(255, 214, 10, 0.1);
		text-align: center;
	}

	.video-header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.video-header h3 {
		color: var(--dark-grey);
		font-size: 1.75rem;
		font-weight: 600;
		margin: 0;
	}

	.video-icon {
		font-size: 2rem;
		opacity: 0.8;
	}

	.video-description {
		color: var(--soft-grey);
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.video-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem 2rem;
		background: linear-gradient(135deg, #f8f9fa, #e9ecef);
		border: 2px solid #e1e5e9;
		border-radius: 16px;
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.video-link::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 214, 10, 0.1), transparent);
		transition: left 0.5s ease;
	}

	.video-link:hover::before {
		left: 100%;
	}

	.video-link:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-lg);
		border-color: var(--primary-yellow);
		background: linear-gradient(135deg, var(--light-grey), #f1f3f4);
	}

	.play-button {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, var(--primary-yellow), var(--secondary-yellow));
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(255, 214, 10, 0.3);
		transition: all 0.3s ease;
	}

	.video-link:hover .play-button {
		transform: scale(1.1);
		box-shadow: 0 6px 20px rgba(255, 214, 10, 0.4);
	}

	.play-icon {
		color: var(--dark-grey);
		font-size: 1.5rem;
		margin-left: 3px; /* Slight adjustment for visual centering */
	}

	.video-info {
		flex: 1;
		text-align: left;
		margin-left: 1.5rem;
	}

	.video-title {
		display: block;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--dark-grey);
		margin-bottom: 0.25rem;
	}

	.video-subtitle {
		display: block;
		font-size: 0.9rem;
		color: var(--soft-grey);
	}

	.external-link-icon {
		font-size: 1.25rem;
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}

	.video-link:hover .external-link-icon {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.dashboard {
			padding: 0 1rem;
		}

		.video-card {
			padding: 1.5rem;
		}

		.video-link {
			flex-direction: column;
			gap: 1rem;
			padding: 1.5rem;
		}

		.video-info {
			text-align: center;
			margin-left: 0;
		}

		.play-button {
			width: 50px;
			height: 50px;
		}

		.play-icon {
			font-size: 1.25rem;
		}

		.video-title {
			font-size: 1.1rem;
		}
	}
</style>
