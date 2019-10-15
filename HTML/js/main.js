var accordBtn = document.querySelectorAll('.accordion-title');
accordBtn.forEach(function(btn){
	btn.addEventListener("click", function(){
		this.querySelector('.accordion-btn').classList.toggle('open');
		this.nextElementSibling.classList.toggle('open');
	});
});

var close = document.querySelector('.close');
close.addEventListener('click', function(){
	var modal = document.querySelector('.modal');
	modal.classList.add('hide');
});