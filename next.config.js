const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'img.freepik.com', 
      'png.pngtree.com', 
      'links.papareact.com', 
      'c4.wallpaperflare.com', 
      'jsonkeeper.com',
      'a0.muscache.com',
      'www.ouedkniss.com',
      'cdn9.ouedkniss.com',
      'images.unsplash.com'
    ],
  },
  webpack: (config, { isServer }) => {
      if (!isServer) {
          // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
          config.resolve.fallback = {
             fs: false
          }
      }
      
      config.resolve.alias['@'] = path.resolve(__dirname);
      
      return config;
  }
};
