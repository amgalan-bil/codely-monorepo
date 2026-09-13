const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray lockfile higher up the filesystem makes Next infer the wrong
  // workspace root; pin it to the monorepo so Turbopack watches only the repo.
  turbopack: {
    root: path.join(__dirname, '../../..'),
  },
  images: {
    // Course covers, program photography and team portraits are Unsplash
    // placeholders until Codely's own photography is available.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

module.exports = nextConfig;
