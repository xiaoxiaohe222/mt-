const baseURL = 'https://meituan.thexxdd.cn/api'
export default (url, data = {}, method = 'GET') => {
	uni.showLoading()
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			data,
			method,
			timeout:2000,
			success(res) {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else {
					reject(res)
				}
				uni.hideLoading()
			},
			fail(error) {
				uni.hideLoading()
				uni.showToast({
					title:'请求失败',
					icon:"none"
				})
				reject(error)
			}
		})
	})
}
