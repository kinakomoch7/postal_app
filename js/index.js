var bar = new ProgressBar.Line(splash_text, {
	easing: 'easeInOut',
	duration: 1500,
	strokeWidth: 0.2,
	color: '#555',
	trailWidth: 0.2,
	trailColor: '#bbb',
	text: {
		style: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			padding: '0',
			margin: '-30px 0 0 0',
			transform:'translate(-50%,-50%)',
			'font-size':'1rem',
			color: '#fff',
		},
		autoStyleContainer: false 
	},
	step: function(state, bar) {
		bar.setText(Math.round(bar.value() * 100) + ' %'); 
	}
});


bar.animate(1.0, function () {
	$("#splash").delay(500).fadeOut(800);
});  

let search = document.getElementById('search');
search.addEventListener('click', ()=>{
    
    let url = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=';
    let error = document.getElementById('error');
    let input = document.getElementById('zipcode');
    let address1 = document.getElementById('address1');
    let address2 = document.getElementById('address2');
    let address3 = document.getElementById('address3');
    let kana1 = document.getElementById('kana1');
    let kana2 = document.getElementById('kana2');
    let kana3 = document.getElementById('kana3');
    let postal = input.value;
    let api = url + postal;
    

    fetch(api, {
        timeout: 300000,
    })
    .then((response)=>{
        error.textContent = '';
        console.log(response);
        return response.json();  
    })
    .then((data)=>{
        if(data.status != 200){
            error.textContent = data.message;
        }else if(data.results === null){
            error.textContent = '郵便番号から住所が見つかりませんでした。';
        } else {
            address1.value = data.results[0].address1;
            address2.value = data.results[0].address2;
            address3.value = data.results[0].address3;
            kana1.value = data.results[0].kana1;
            kana2.value = data.results[0].kana2;
            kana3.value = data.results[0].kana3;
            console.log(data);
        }
    })
    .catch((ex)=>{
        console.log(ex);
    });
}, false);

