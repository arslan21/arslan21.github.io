var pageHeader=document.querySelector(".page-header"),nav=pageHeader.querySelector(".nav"),navToggle=pageHeader.querySelector(".nav__toggle");function rangeSlider(){var e=document.querySelector(".slide__slider"),a=document.querySelector(".slide__before");console.log(e.value),a.style.width=e.value+"%",console.log(a.style.width)}nav.classList.remove("nav--nojs"),nav.classList.remove("nav--opened"),nav.classList.add("nav--closed"),navToggle.addEventListener("click",function(){nav.classList.contains("nav--closed")?(nav.classList.remove("nav--closed"),nav.classList.add("nav--opened")):(nav.classList.add("nav--closed"),nav.classList.remove("nav--opened"))});