/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.printify.com",
                port: "",
            },
        ],
    },
};

export default nextConfig;
