function showMore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readMoreButton");
    console.log(btnText)
    console.log(dots)

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read More";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read Less";
      moreText.style.display = "inline";
    }
  }

//   function showMoreSpotify() {
//     var dots = document.getElementById("dots");
//     var moreText = document.getElementById("more");
//     var btnText = document.getElementById("readMoreButton");
//     if (dots.style.display === "none") {
//       dots.style.display = "inline";
//       btnText.innerHTML = "Read More";
//       moreText.style.display = "none";
//     } else {
//       dots.style.display = "none";
//       btnText.innerHTML = "Read Less";
//       moreText.style.display = "inline";
//     }
//   }