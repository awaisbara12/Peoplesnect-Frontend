/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = nextConfig;

const withTM = require("next-transpile-modules")(["react-timezone-select"]);

module.exports = withTM({
  // ...further Next.js config
  experimental: {
    forceSwcTransforms: true,
  },
});


// module.exports = {
//   experimental: {
//     forceSwcTransforms: true,
//   },
// }