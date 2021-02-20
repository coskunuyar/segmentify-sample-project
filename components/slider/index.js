class Slider {
  constructor(props){
    this.props = props;
    this.randomId = Math.random().toString().replace('.','');
    this.carouselOptions = {
      ...carouselOptionsDefault,
      ...this.props.customCarouselOptions
    };
    this.parentElement = props.parentElement || document.getElementById('app');
  }

  startCarousel = () => {
    const owl = $(`.${this.randomId}`)
    owl.owlCarousel(this.carouselOptions)
    
    $(".stop").hide();

    $(".next").click(() => {
      owl.trigger('next.owl.carousel');
    })

    $(".prev").click(() => {
      owl.trigger('prev.owl.carousel');
    })

    $(".play").click(() => {
      $(".play").hide();
      $(".stop").show();
      owl.trigger('play.owl.autoplay',850);
    })

    $(".stop").click(() => {
      $(".stop").hide();
      $(".play").show();
      owl.trigger('stop.owl.autoplay');
    })
  }

  drawHTML = () => {
    const owlCarouselContainer = document.createElement("div")
    owlCarouselContainer.className = `slider-main-container`;

    this.props.data.forEach(item => {
      owlCarouselContainer.innerHTML += `
        <a href="${item.url}" target="_blank">
          <div class="item slider-item">
              ${this.drawLabels(item)}
                <img class="slider-item-image" src=${item.image} />
                <p class="slider-item-name">${item.name}</p>
              <p class="slider-item-subdescriptions">
                ${item.params.land && `<span>${item.params.land}</span>`}
                ${item.params.region && `<span> | ${item.params.region}</span>`}
                ${item.params.art && `<span> | ${item.params.art}</span>`}
                ${item.params.rebsorte && `<span> | ${item.params.rebsorte}</span>`}
              </p>
            <p>
              <span class="slider-item-price">${item.priceText}*</span>
              <span class="slider-item-price-discounted">${item.oldPriceText}</span>
            </p>
            <p class="slider-item-price-base">${item.params.basePrice}</p>
          </div>
        </a>
      `;
    });

    owlCarouselContainer.innerHTML = `
    <div class="${this.randomId} owl-carousel owl-theme">
      ${owlCarouselContainer.innerHTML}
    </div>`;

    if(this.props.title){
      owlCarouselContainer.innerHTML = `
        <h1>${this.props.title}</h1> ${owlCarouselContainer.innerHTML}
      `;
    }

    if(this.props.buttonNavigation){
      owlCarouselContainer.innerHTML +=`
        <div class="slider-buttton-navigation">
          <button class="play">▶ Automatisches Abspielen</button>
          <button class="stop">◼ Halt !</button>
          <button class="prev">⬅ Bisherige</button>
          <button class="next">➡ Nächster</button>
        </div>
      `;
    }

    this.parentElement.appendChild(owlCarouselContainer);
  }

  drawLabels = (item) => {
    let result = '';
    if(item.oldPriceText){
      const discountAmount = Math.round((item.oldPrice/item.price) * 100 - 100);
      result += `<p class="slider-item-info-discount">-${discountAmount}%<p>`
    }
    if(item.params.likeCount){
      result += `<p class="slider-item-info-like">♡ ${item.params.likeCount}<p>`
    }
    if(item.params.isNew){
      result += `<p class="slider-item-info-isnew">NEU<p>`
    }
    return result ? `<div class="slider-item-info-field">${result}</div>` : '';
  }

  render = () => {
    this.drawHTML();
    this.startCarousel();
  }
};

const carouselOptionsDefault = {
  margin:10,
  dots: false,
  nav: true,
  lazyLoad: true,
  navText: ['<h2 class="nav-button">⬅</h2>',
            '<h2 class="nav-button">➡</h2>'],
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
        items:5
      }
  }
}