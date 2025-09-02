const menuOpen = document.querySelector('.menu__open');
const menuClose = document.querySelector('.menu-close');
const hamMenuPage = document.querySelector('.ham-menu-page');
const hamMenu= document.querySelector('.ham-menu');
const hamMenuList = document.querySelectorAll('.ham-menu__list');
const headerNavMenuList = document.querySelectorAll('.header-nav-menu__list');
const header = document.querySelector('header');
const headerHeight = header.offsetHeight;
const sectionName = document.querySelectorAll('.section-name');
const menuListCont = document.querySelectorAll('.menu-list__container');
const menuBtnContaianer = document.querySelector('.menu-btn__container');
const menuBtn = document.querySelector('.menu-btn');
const menuMark = document.querySelector('.menu-mark');
const menu = document.querySelector('#menu');

const menuOpenTime = 480;
const menuCloseTime = 480;

const menuOpenOptions = {
  duration: menuOpenTime,
  easing: 'ease-out',
  fill: 'forwards',
};

const menuCloseOptions = {
  duration: menuCloseTime,
  easing: 'ease-out',
  fill: 'forwards',
  direction: 'reverse'
};

  const menuAnimation = (menuOption) => {
    hamMenuPage.animate({
      opacity: ['0', '1'],
      visibility: ['hidden', 'visible'],
      left: ['100vw', '0']
    }, menuOption);
  };

  menuOpen.addEventListener('click', () => {
    menuAnimation(menuOpenOptions);
  });

  menuClose.addEventListener('click', () => {
    menuAnimation(menuCloseOptions);
  });

//  smooth scroll function =================================
const smoothSc = (targetEle, Scdelay) => {
  setTimeout(() => {
    window.scrollTo({
      top: targetEle.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  }, Scdelay);
}

//  nav click ===============================================
const menuClick = (el, menuOption) => {
  el.forEach((els) => {
    els.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = els.getAttribute('href').substring(1);
    const targetEle = document.getElementById(targetId);
    menuAnimation(menuOption);
    smoothSc(targetEle, menuCloseTime);
    });
  });
}

menuClick(hamMenuList, menuCloseOptions);
menuClick(headerNavMenuList);

//  scroll animation ===============================================
const scrollAnimation = (entries, observer) => {
    entries.forEach((entry) => {
    const keyframes = {
      opacity: [0, 1],
      transform: ['translate(-6px, 0px)', 'translate(0, 0)'],
    }
    if (entry.isIntersecting) {
      entries[0].target.animate(keyframes, 1500);
      // console.log(entries[0].target);
      
      observer.unobserve(entries[0].target);
      // console.log(observer);
    }
  });
};
const sectionObserber = new IntersectionObserver(scrollAnimation);

sectionName.forEach((els) => {
  sectionObserber.observe(els);
});

//  menu button ===============================================
  menuListCont.forEach((el) => {
    el.style.visibility = 'hidden';
    el.style.height = '0';
    el.style.opacity = '0';
  });
  menuMark.style.transform = 'rotateX(0)';
  let isOpen = false;

  const menuBtnOptions = {
    duration: 600,
    easing: 'ease-out',
    fill: 'forwards',
  }

  const menuBtnOptionsOpacity = {
    duration: 900,
    easing: 'ease-in',
    fill: 'forwards',
  }

  const menuBtnOptionsRevers = {
    duration: 480,
    easing: 'ease',
    fill: 'forwards',
    direction: 'reverse',
  }

  const menuBtnOptionsReversOpacity = {
    duration: 300,
    easing: 'ease-out',
    fill: 'forwards',
    direction: 'reverse',
  }

  const menuBtnAnimation = (option, option__2) => {
    menuListCont.forEach((el) => {
      el.animate({
        visibility: ['hidden', 'visible'],
        height: ['0', 'auto'],
      }, option);
      el.animate({
        opacity: ['0', '1'],
      }, option__2);
    });

    menuMark.animate({
      transform: ['rotateX(0)', 'rotateX(180deg)'],
    }, option);
  };

  menuBtn.addEventListener('click', () => {
    if(!isOpen) {
      menuBtnAnimation(menuBtnOptions, menuBtnOptionsOpacity);
    } else {
      menuBtnAnimation(menuBtnOptionsRevers, menuBtnOptionsReversOpacity);
      smoothSc(menu, 1000);
    }
    isOpen = !isOpen;
  });


