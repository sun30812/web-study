const fs = require('fs');
// const fs = require('fs').promises; <-- createStream관련 함수 사용 불가!

fs.createReadStream('./readme.md')
	.on('open', () => {
		console.log('파일 읽기 완료!');
	})
	.on('error', (err) => {
		console.log('다음 오류가 발생했습니다: ', err.toString());
	})
