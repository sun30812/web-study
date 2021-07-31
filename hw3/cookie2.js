const http = require('http');
const fs = require('fs').promises;

const parseCookies = (cookie = '') =>
	cookie
		.split(';')
		// 배열의 각 원소마다 =을 기준으로 split진행
		.map(v => v.split('='))
		.reduce((acc, [k, v]) => {
			acc[k.trim()] = decodeURIComponent(v)
			return acc;
		}, {});

// 서버 수현(비동기적 동작)
http.createServer(async (req, res) => {
	// 헤더에서 쿠키정보 받아오기
	const cookies = parseCookies(req.headers.cookie);
	// 로그인 버튼 누를 시(html파일의 액션에 명시됨.)
	if (req.url.startsWith('/login')) {
		const { query } = url.parse(req.url);
		const { name } = qs.parse(query);
		const expires = new Date();
		// 현재시간의 5분 뒤
		expires.setMinutes(expires.getMinutes() + 5);

		res.writeHead(302, {
			Location: '/',
			'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`
		});

		res.end();
		// name이란 쿠키가 있는 경우
	} else if (cookies.name) {
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end(`${cookies.name}님 안녕하세요`);
	} else {
		try {
			// 이도저도 아닌경우 html을 띄어봄
			const data = await fs.readFile('./cookie2.html');
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
			res.end(data);
		} catch (err) {
			console.error(err);
			res.end(err.message);
		}
	}
})
	.listen(8080, () => {
		console.log('8080포트에서 대기중');
	})