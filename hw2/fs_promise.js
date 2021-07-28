// 배운 내용을 활용하여 파일 출력을 다룬 예제입니다.
const fs = require('fs').promises;

fs.readFile('./readme.md')
	.then((dat) => {
		console.log('====readme.md 출력====');
		console.log(dat.toString());
	})
	.catch((err) => {
		console.error('오류가 발생하였습니다. 오류내용은 다음과 같습니다: ', err);
	});
fs.readFile('./readme2.md')
	.then((dat) => {
		console.log('====readme2.md 출력====');
		console.log(dat.toString());
	})
	.catch((err) => {
		console.error('오류가 발생하였습니다. 오류내용은 다음과 같습니다: ', err.toString());
	});
