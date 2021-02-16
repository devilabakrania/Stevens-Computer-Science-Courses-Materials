jQuery(document).ready(function($) {

  var form = $("#createIssue"),
    name = $("#name"),
    category = $("#category"),
    lat = $("#latitude1"),
	lng = $("#longitude1"),
    city = $("#city1"),
    state = $("#state1"),
	date = $("#date1"),
	feed = $("#feed");


  form.submit(function(event) {
    event.preventDefault();

    var name1 = name.val();
    var category1 = category.val();
    var lat1 = lat.val();
	var lng1 = lng.val();
	var city1 = city.val();
	var state1 = state.val();
	var date1 = date.val();


    if (name && category) {
        var requestConfig = {
          method: "POST",
          url: "/createIssue",
          contentType: "application/json",
          data: JSON.stringify({
            name: name1,
            category: category1,
			latitude: lat1,
			longitude: lng1,
			city: city1,
			state: state1,
			date: date1
          })
        };
        $.ajax(requestConfig).then(function(responseMessage) {
          // console.log(responseMessage);
          var newElement = $(responseMessage);

          feed.prepend(newElement);
        });
    }
  });
});
