import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@app': path.resolve(__dirname, 'src/app'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@processes': path.resolve(__dirname, 'src/processes'),
    };

    return config;
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frontend-test-api.yoldi.agency',
        pathname: '/api/image/src/**',
      },
    ],
  },
};

export default nextConfig;
