const app = () => {
  
  const defaultProps = { 
    title: 'Example Title',
    data: productsData 
  };

  const productSlider1 = new Slider({
    ...defaultProps,
    title: 'Example 1: Unsere Empfehlungen für Sie'
  });

  const productSlider2 = new Slider({
    ...defaultProps,
    title: 'Example 2: Unsere Empfehlungen für Sie',
    customCarouselOptions: {
      loop: true,
      autoplay: true,
      nav: false,
      autoplayTimeout: 850,
      autoplayHoverPause: true,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:2
        },
        1000:{
          items:3
        },
        1250:{
          items:3
        },
        1700: {
          items:3
        }
    }
    }
  });

  const productSlider3 = new Slider({
    ...defaultProps,
    title: 'Example 3: Unsere Empfehlungen für Sie',
    buttonNavigation: true,
    customCarouselOptions: {
      loop: true,
      nav: false,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:2
        },
        1000:{
          items:3
        },
        1250:{
          items:4
        },
        1700: {
          items:4
        }
    }
  }
  });

  [productSlider1,productSlider2,productSlider3].forEach(component =>{
     component.render()
  });
};

app();