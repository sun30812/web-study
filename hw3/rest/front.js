const axios = require('axios')

async function getUser() {
	try {
		const res = await axios.get('/users');
		const users = res.data;
		// list라는 id를 가진 객체를 지정
		const list = document.getElementById('list');

		list.innerHTML = '';

		Object.keys(users).map(function (key) {
			const userDiv = document.createElement('div');
			const span = document.createElement('span');
			span.textContent = users[key];

			// 객체 생성
			const edit = document.createElement('button');
			edit.textContent = '수정';
			edit.addEventListener('click', async () => {
				const name = prompt('바꿀 이름을 입력하세요');
				if (!name) {
					return alert('이름을 반드시 입력해야 합니다.');
				}
				try {
					await axios.put('/user/' + key, { name });
					getUser();
				} catch (err) {
					console.error(err);
				}
			});

			const remove = document.createElement('button');
			remove.textContent = '삭제';
			// onClick
			remove.addEventListener('click', async () => {
				try {
					await axios.delete('/user/' + key);
					getUser();
				} catch (err) {
					console.error(err);
				}
			});
			// userDiv에 추가
			userDiv.appendChild(span);
			userDiv.appendChild(edit);
			userDiv.appendChild(remove);

			list.appendChild(userDiv);

			console.log(res.data);
		});
	} catch (err) {
		console.error(err);
	}
}
// 창이 열리면 특정 함수를 실행할 수 있도록 해줌
window.onload = getUser;

document.getElementById('form').addEventListener('submit', async (e) => {
	// submit 액션에 기본적으로 정의된 동작 무시
	e.preventDefault();

	const name = e.target.username.value;

	if (!name) {
		return alert('이름을 입력하세요');
	}

	try {
		await axios.post('/user', { name });
		getUser();
	} catch (err) {
		console.error(err);
	}
	e.target.username.value = '';
});