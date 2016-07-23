$(document).ready(function() {
  var jobHtml =$('#job-template').html();
      jobsTemplate = Handlebars.compile(jobHtml);

  //show jobs
  $.get('/api/positions').success(function(positions) {
    positions.forEach(function (position) {
      renderPosition(position);
    });
  });

  //add job


  $('.form-horizontal').on("submit", function(e) {
    e.preventDefault(e);
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/positions', formData, function(position) {
      console.log('position after POST', position);
      renderPosition(position);
    });
    $(this).trigger("reset");
  });
});

var jobsTemplate;

function renderPosition(position) {
  var html = jobsTemplate(position);
  $('#job-postings').prepend(html);
}
