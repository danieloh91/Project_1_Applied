$(document).ready(function() {
  var jobHtml =$('#job-template').html();
      jobsTemplate = Handlebars.compile(jobHtml);

  //show jobs
  $.get('/api/positions').success(function(positions) {
    positions.forEach(function (position) {
      renderPosition(position);
    });
  });
});

var jobsTemplate;

function renderPosition(position) {
  var html = jobsTemplate(position);
  $('#job-postings').prepend(html);
}
