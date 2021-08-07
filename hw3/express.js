const express = require('express')
const path = require('path')

const app = express();
// 포트 설정(환경변수 port가 존재하면 그걸 port변수로 지정하고 설정 안되어있으면 3000번을 지정)
app.set('port', process.env.PORT || 3030);
// public 폴더를 루트 폴더로 지정
app.use('/', express.static(path.join(__dirname, 'public')));
// main요청 시 내보낼 파일
app.get('/main', (req, res) => {
	res.sendFile(path.join(__dirname, 'main.html'));
})
// 서버 구축
app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 에서 대기중');
})

const multer = require('multer');
const fs = require('fs');

try {
	fs.readdirSync('uploads');
} catch (err) {
	console.error('기본 폴더 부재상태이므로 새로 생성하겠습니다.');
	fs.mkdirSync('uploads');
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, done) {
			done(null, 'uploads/');
		},
		filename(req, file, done) {
			const ext = path.extname(file.originalname);
			done(null, path.basename(file.originalname, ext) + Date.now() + ext);
		}
	}),
	// 용량 제한: 5MB
	limits: { fileSize: 5 * 1024 * 1024 },
})

app.get('/upload', (req, res) => {
	res.sendFile(path.join(__dirname, 'multi.html'));
})