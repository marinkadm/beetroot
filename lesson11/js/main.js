$(document).ready(function () {

  // add active class to clicked nav item
  $(".header__nav a").click(function (event) {
    event.preventDefault();
    $(".header__nav a").removeClass('active');
    $(this).addClass('active');
  });


  // Slow scroll from nav item to current section
  $(".header__nav a, .section-home__btn-next").click(function (event) {
      event.preventDefault();
      let id = $(this).attr("href");
      let top = $(id).offset().top;
      let headerHeight = $('.header').height();
      let isHeaderSticky = $('.header').hasClass('header--sticky');
      let scrollTop = isHeaderSticky ? top - headerHeight : top - headerHeight - 60;
      $("body, html").animate({ scrollTop }, 700 );
    }
  );


  // sticky header
  if ($('.header').length) {
    let renderHeader = function () {
      const HEADER = $('.header');
      let headerHeight = HEADER.height();
      let scrollTop = $(window).scrollTop();
      if (scrollTop > headerHeight) {
        HEADER.addClass("header--sticky");
      } else {
        HEADER.removeClass("header--sticky");
      }
    }
    renderHeader();
    $(window).scroll(function () {
      renderHeader();
    })
  }


  // button back to top
  if ($("#button__page-up").length) {
    let scrollTrigger = 300; // px
    let backToTop = function () {
      let scrollTop = $(window).scrollTop();
      if (scrollTop > scrollTrigger) {
        $("#button__page-up").addClass("is-visible");
      } else {
        $("#button__page-up").removeClass("is-visible");
      }
    };
    backToTop();
    $(window).scroll(function () { backToTop(); });
    $("#button__page-up").click(function (e) {
        e.preventDefault();
        $("html,body").animate({
            scrollTop: 0
          }, 700
        );
      }
    );
  }


  // open modal
  $(".section-about__btn--show-modal").click(function() {
    $('#modal').addClass('modal--show');
    $('body').addClass('hidden');
  });


  // close modal
  $('.modal__btn--close, .modal__btn--cancel').click(function() {
    $('#modal').removeClass('modal--show');
    $('body').removeClass('hidden');
  });


  // close modal by clicking outside of modal content
  $(document).click(function (event) {
    if (!$(event.target).closest(".modal__wrapper, .section-about__btn--show-modal").length) {
      $("#modal").removeClass("modal--show");
      $('body').removeClass('hidden');
    }
  });

//chanche navigation active class scroll






});