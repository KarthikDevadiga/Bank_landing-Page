'use strict';

///////////////////////////////////////
// Modal window

//selecting header
const header = document.querySelector(".header");




const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////////////////////////////////
///////////////////////////////////////////


//insering cookies
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = "We use cookies for improved functionality and analytics.<button class='btn btn--close-cookie'>Got it</button>"

message.style.position = "fixed";
message.style.bottom = 0;


header.append(message);
const cookie_close_button = document.querySelector(".btn--close-cookie");
//button close cookie
cookie_close_button
.addEventListener('click', function(e){
  message.remove();
});


message.style.backgroundColor = "#37383D"

message.style.height = Number.parseFloat(getComputedStyle(message).height,10)+30+"px"


//*  smmoth Scrolling */
const learnMore = document.querySelector(".btn--scroll-to");

const toScroll = document.querySelector("#section--1");

learnMore.addEventListener("click", function(e){
  console.log(e.target.getBoundingClientRect());
  console.log(toScroll.getBoundingClientRect());

  toScroll.scrollIntoView({behavior : "smooth"});
})

//adding event listner for nav links



document.querySelector(".nav__links").addEventListener("click", function(e){
  e.preventDefault();
  if(e.target.classList.contains("nav__link")){
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior : "smooth"})
  }
}) 

const h1 = document.querySelector("h1");
console.log(h1.querySelectorAll(".highlight"));


//tabs

const tabesContent = document.querySelectorAll(".operations__content")

const tabcontainer =document.querySelector(".operations__tab-container");

tabcontainer.addEventListener("click", function(e){
  e.preventDefault();

  //removing operations__tab--active class
  
 
  const tab = e.target.closest(".operations__tab");
  if(!tab) return;


  const childrenList = e.target.parentElement.children;
  [...childrenList].forEach(function(el){
    
    el.classList.remove("operations__tab--active");
  })


  tabesContent.forEach(function(el){
    el.classList.remove("operations__content--active")
  })


  //adding operations__tab--active
  tab.classList.add("operations__tab--active");
  const showing = document.querySelector(`.operations__content--${tab.dataset.tab}`);
  showing.classList.add("operations__content--active")


})

//adding and remving opacity on hover effect

const nav = document.querySelector(".nav");
const handelHover = function(e, opacity){
  
  if(e.target.classList.contains("nav__link")){
   // console.log(this);
    const i = this;
    const targeted_ele = e.target;
    const siblings = targeted_ele.closest(".nav__links").querySelectorAll(".nav__link");
    const logo = targeted_ele.closest(".nav").querySelector(".nav__logo");
    siblings.forEach(function(ele){
      if(ele !== targeted_ele){
        console.log(ele);
        ele.style.opacity = i;
      }
    })
    logo.style.opacity = this;
  }
}
//class="nav__item"
nav.addEventListener("mouseover", handelHover.bind(0.5));
nav.addEventListener("mouseout", handelHover.bind(1));
// nav.addEventListener("mouseover", function(e){
//   if(e.target.classList.contains("nav__link")){
//     const targeted_ele = e.target;
//     const siblings = targeted_ele.closest(".nav__links").querySelectorAll(".nav__link");
//     const logo = targeted_ele.closest(".nav").querySelector(".nav__logo");
//     siblings.forEach(function(ele){
//       if(ele !== targeted_ele){
//         ele.style.opacity = 0.5;
//       }
//     })
//     logo.style.opacity = 0.5;
//   }
// })

// nav.addEventListener("mouseout", function(e){
//   if(e.target.classList.contains("nav__link")){
//     const targetEle = e.target;
//     const siblings = targetEle.closest(".nav__links").querySelectorAll(".nav__link");
//     const logo =  targetEle.closest(".nav").querySelector(".nav__logo");

//     siblings.forEach(function(ele){
//       ele.style.opacity = 1;
//     })
//     logo.style.opacity = 1;
//   }
// })

// const scroll_top = toScroll.getBoundingClientRect();

// window.addEventListener("scroll", function(){
//   if(this.window.scrollY > scroll_top.top){
//     nav.classList.add("sticky");
//     nav.style.opacity = 0.7;
//   }else{
//     nav.classList.remove("sticky");

//   }
// })




/////////////////////////////////////////////////////////////+++++++++++++++++++++++++++++++++++++++++++++++++++++++

const nav_height = nav.getBoundingClientRect().height;


const method_to_call = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting){
    nav.classList.add("sticky");
    nav.style.opacity = 0.7;
  }else{
    nav.classList.remove("sticky");
    nav.style.opacity = 1;
  }
}

const options_dict = {
  root : null,
  threshold : 0,
  rootMargin : `-${nav_height}px`,
}

const obeserver = new IntersectionObserver(method_to_call, options_dict);

obeserver.observe(header)



////////////
const sections = document.querySelectorAll(".section");

const sectionFunction = function(entries, observer){
  const entry = entries[0];
  if(!entry.isIntersecting) return;
  console.log(entry);
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);

}

const sectionObject = {
  root : null,
  threshold : .25,
}


const sectionObserver = new IntersectionObserver(sectionFunction, sectionObject);

sections.forEach(function(ele){
  sectionObserver.observe(ele);
  ele.classList.add("section--hidden");
})


/////lazy images
const img_arry = document.querySelectorAll("img[data-src]")
console.log(img_arry);

//function
const img_fun = function(entries, observer){
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    console.log(entry.target.src);

    //loads after loading

    entry.target.addEventListener("load", function(){
      entry.target.classList.remove("lazy-img")
      observer.unobserve(entry.target)
    })

}

const img_dict = {
  root : null,
  threshold : 0.5,
  rootMargin : "-200px",
}



const img_observer = new IntersectionObserver(img_fun, img_dict);

img_arry.forEach(function(ele){
  img_observer.observe(ele);
})



//implimenting side-bar/////////
document.querySelector(".slider").style.overflow = "visible"


const slide_arr = document.querySelectorAll(".slide");
const size = slide_arr.length;
const slide_btn_right = document.querySelector(".slider__btn--right")
const slide_btn_left = document.querySelector(".slider__btn--left")

slide_arr.forEach(function(e, i){
  e.style.transform = `translateX(${100 * i}%)`
})

let sidebar = 0;



slide_btn_right.addEventListener("click", function(){
  if(sidebar === size-1){
    sidebar = 0;
  }else{
    sidebar++;
  }
  
  slide_arr.forEach(function(e, i){
    e.style.transform = `translateX(${100 * (i - sidebar)}%)`
  })
})

slide_btn_left.addEventListener("click", function(){
  if(sidebar === 0){
    sidebar = size-1;
  }else{
    sidebar--;
  }
  
  slide_arr.forEach(function(e, i){
    e.style.transform = `translateX(${100 * (i - sidebar)}%)`
  })
})