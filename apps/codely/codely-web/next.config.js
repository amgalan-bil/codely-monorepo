/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Course covers, program photography and team portraits are Unsplash
    // placeholders until Codely's own photography is available.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

module.exports = nextConfig;
