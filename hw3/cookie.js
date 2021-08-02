const http = require('http');
const port = 8081;

http.createServer((req, res) => {
	console.log(req.url, req.headers.cookie);
	// 쿠키 등록 -> 이름은 name, 값은 test로 쿠키 등록
	res.writeHead(200, { 'Set-Cookie': 'name=test' });
	res.end('Hello Cookie');
})

	.listen(port, () => {
		console.log(port + '포트에서 열림');
	})