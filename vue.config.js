module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API_BASE_URL,
                changeOrigin: true,
                pathRewrite: { "/api": "/" },
            },
        }
    }
}
