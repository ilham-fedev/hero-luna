// Luna Beach Club Hero Script - Based on original scripts_luna.js

function setPositions() {
  var r = $("#Menu").outerWidth() / 2;

  var items = $("#Menu").find(".luna-menu-item");
  var itemWidth = $("#Menu").find(".luna-menu-item").width();
  var counter = items.length;

  var step = 360 / counter;
  var angle = 90 - 360 / counter;

  var rad = angle * (Math.PI / 180);

  var x = 0;
  var y = 0;

  $(".luna-menu-item").css({ left: r, "margin-top": r });

  $.each(items, function () {
    angle += step;
    rad = angle * (Math.PI / 180);
    x = Math.round(r * Math.cos(rad) - r + itemWidth / 2 + 2);
    y = Math.round(r * Math.sin(rad) - r + itemWidth / 2 + 2);
    $(this).animate({ left: -1 * x + "px", "margin-top": -1 * y + "px" });
  });
}

$(document).ready(function () {
  setPositions();

  var mainSliders = $(".main-sliders");

  // Initialize Owl Carousel with Luna settings
  $(".main-sliders").owlCarousel({
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    items: 1,
    nav: 0,
    dots: 1,
    margin: 0,
    loop: true,
    URLhashListener: true,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    startPosition: "URLHash",
  });

  // Sync carousel changes with menu
  mainSliders.on("changed.owl.carousel", function (event) {
    $("#Menu")
      .find(".luna-menu-item.item" + event.page.index + " a")
      .trigger("click");
  });

  // Show menu and set initial state
  $(".menu_wrapper").fadeIn();
  $(".luna-menu-item:first-child").addClass("active");

  var firstItem = $(".luna-menu-item:first-child a");
  var items = $("#Menu").find(".luna-menu-item");
  var counter = items.length;
  var step = 360 / counter;

  $("#Menu").addClass(" pm_" + firstItem.attr("class"));

  // Initialize preview label with first item
  $(".preview_label .heading").html(
    $(".luna-menu-item:first-child a").attr("data-title"),
  );
  $(".preview_label .desc").html(
    $(".luna-menu-item:first-child a").attr("data-desc"),
  );
  $(".preview_label a.btn").attr(
    "href",
    $(".luna-menu-item:first-child a").attr("data-url"),
  );

  // Handle menu item clicks with rotation animation
  $(".luna-menu-item a").on("click", function () {
    $(".preview_label").fadeOut(300);
    var activeClass = $(this).attr("class");
    var itemNum = $(this).data("num");
    var totalRotate = itemNum * step;

    // Rotate the menu container and counter-rotate items
    $("#Menu").css({ transform: "rotate(" + -1 * totalRotate + "deg)" });
    $("#Menu .luna-menu-item").css({
      transform: "rotate(" + totalRotate + "deg)",
    });

    setTimeout(() => {
      $(".menu")
        .removeClass()
        .addClass("menu pm_" + activeClass);
      $(".preview_label .heading").html($(this).attr("data-title"));
      $(".preview_label .desc").html($(this).attr("data-desc"));
      $(".preview_label a.btn").attr("href", $(this).attr("data-url"));
    }, 300);

    $(".luna-menu-item").removeClass("active");
    $(this).parent().addClass("active");

    setTimeout(() => {
      $(".preview_label").fadeIn();
    }, 1500);
  });

  // Handle window resize
  var id;
  $(window).resize(function () {
    clearTimeout(id);
    $(".menu_wrapper").fadeOut();
    id = setTimeout(doneResizing, 1500);
  });

  function doneResizing() {
    setPositions();
    $(".menu_wrapper").fadeIn();
  }
});
