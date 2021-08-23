module.exports = {
		devServer: {
			proxy: {
				"/capi": {
					target: "http://capi.douyucdn.cn",
					secure: false,
					changeOrigin: true,
					pathRewrite: {
						"^/capi": ""
			}
		},
		"/douyu": {
					target: "https://m.douyu.com",
					secure: true,
					changeOrigin: true,
					pathRewrite: {
						"^/douyu": ""
			}
		}
	}
}
}