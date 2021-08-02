const http = require('http')
const fs = require('fs').promises
const url = require('url')
const qs = require('querystring')


const parseCookies = (cookie = '') =>
	cookie
		.split(';')
		.map(v => v.split('='))
		.reduce((acc, [k, v]) => {
			// key값에 혹시모를 공백 제거 -> acc배열의 해당 인덱스에
			// 디코드된 URI값 할당
			acc[k.trim()] = decodeURIComponent(v)
			// acc 배열 리턴
			return acc
		}, {})
// 세션 해쉬맵 변수 생성
const session = {};

http.createServer(async (req, res) => {
	// cookies변수에 파싱한 쿠키를 할당(요청 헤더의 쿠키에서 파싱)
	const cookies = parseCookies(req.headers.cookie)

	// login 액션 작동 시
	if (req.url.startsWith('/login')) {
		const { query } = url.parse(req.url);
		const { name } = qs.parse(query)
		// 변수에 현재 시간 저장
		const expires = new Date()
		// 만료일 변수에 현재 시간의 +5분 한 값을 저장
		expires.setMinutes(expires.getMinutes() + 5)

		const uniqueInt = Date.now()
		// 키: uniqueInt / 값: name, expires
		session[uniqueInt] = {
			name,
			expires,
		}

		res.writeHead(302, {
			Location: '/',
			'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toTimeString()}; HttpOnly; Path=/`
		})
		res.end()

	} else if (cookies.session && session[cookies.session].expires > new Date()) {
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
		res.end(`${session[cookies.session].name}님 안녕하세요`)
	} else {
		try {
			const data = await fs.readFile('./hw3/cookie2.html')
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
			res.end(data)
		} catch (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
			res.end(err.message)
		}
	}
})
	.listen(8080, () => {
		console.log('8080포트 열림');
	})