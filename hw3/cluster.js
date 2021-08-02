const http = require('http')
const cluster = require('cluster')
const cpuNums = require('os').cpus().length

// 부모 프로세서 여부 확인
if (cluster.isMaster) {
	console.log(`마스터 프로세스의 ID는 ${process.pid}`)
	// cpu개수만큼 fork
	for (let i = 0; i < cpuNums; i++) {
		cluster.fork()
	}
	// 클러스터 종료 시 동작 지정
	cluster.on('exit', (worker, code, signal) => {
		console.log(`${worker.process.pid}번 워커 종료됨`)
		console.log('code', code, 'signal', signal)
		cluster.fork()
	})
} else {
	http.createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
		res.write('<h1>Hello Node</h1>')
		res.end('<p>Hello Server</p>')

		setTimeout(() => {
			process.exit(1);
		}, 1000)
	}).listen(8080)
	console.log(`${process.pid}번 워커 실행`)
}