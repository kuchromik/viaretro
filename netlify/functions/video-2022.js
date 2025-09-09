// Netlify Function: video-2022.js
exports.handler = async function(event, context) {
  const videoUrl = 'https://www.chromikoffsetdruck.de/Viaphoniker_Sommerfest_2022.mp4';
  try {
    const response = await fetch(videoUrl);
    if (!response.ok) {
      return {
        statusCode: 500,
        body: 'Video fetch failed'
      };
    }
    return {
      statusCode: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'video/mp4'
      },
      body: Buffer.from(await response.arrayBuffer()).toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Error: ' + err.message
    };
  }
};
