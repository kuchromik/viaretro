import { error } from '@sveltejs/kit';

export async function GET() {
  // Demo-Video-URL
  const videoUrl = 'https://www.chromikoffsetdruck.de/ViaphonikerTopTen.mp4';

  const response = await fetch(videoUrl);
  if (!response.ok) throw error(500, 'Video fetch failed');

  return new Response(response.body, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'video/mp4'
    }
  });
}
