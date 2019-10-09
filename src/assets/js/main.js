var accordBtn = document.querySelectorAll('.accordion-title');
accordBtn.forEach(function(btn){
	btn.addEventListener("click", function(){
		this.querySelector('.accordion-btn').classList.toggle('open');
		this.nextElementSibling.classList.toggle('open');
	});
});