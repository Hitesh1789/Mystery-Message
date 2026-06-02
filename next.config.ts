// next.config.js — look for anything like this ❌
module.exports = {
  async rewrites() {
    return [
      {
        source: '/models/:path*',        // ← THIS would hijack your HF calls
        destination: 'http://localhost:...'
      }
    ]
  }
}