var jobsTemplate;
// var allPositions = [];
var $jobsList;

$(document).ready(function() {
  var jobHtml =$('#job-template').html();
      jobsTemplate = Handlebars.compile(jobHtml);

  $jobsList = $('#job-postings');

  //show jobs
  $.get('/api/positions').success(function(positions) {
    positions.forEach(function(position) {
      console.log('calling GET Request', position);
      render(position);
    });
  });

  //add job post
  $('#new-job-form').on("submit", function(e) {
    console.log('calling on submit');
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('retreiving formData', formData);
    $.post('/api/positions', formData, function(position) {
      console.log('position after POST', position);
      // allPositions.push(position);
      render(position);
    });
    $(this).trigger("reset");
  });

});

// function render() {
//   $jobsList.empty();
//   var html = jobsTemplate({positions: allPositions});
//   $jobsList.prepend(html);
// }

function render(position) {
  // $jobsList.empty();
  var html = jobsTemplate(position);
  $jobsList.prepend(html);
}
