function initMap() {
  let beetroot = { lat: 47.815, lng: 35.171 };
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: beetroot
  });
  let marker = new google.maps.Marker({
    position: beetroot,
    map: map
  });
}
