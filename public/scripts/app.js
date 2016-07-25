var jobsTemplate;
// var allPositions = [];
var $jobsList;

$(document).ready(function() {
  var jobHtml = $('#job-template').html(),
      baseUrl = '/api/positions';
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

  //edit job post
  $jobsList.on('click', '.update-post', function(e) {
    e.preventDefault();
    console.log('it clicks');
    var id= $(this).closest('.post').data('position-id');
    console.log('id', id);
    $('.collapse').show();
    $('#update-post').on("submit", function(e) {
      e.preventDefault();
      $.ajax({
        method: 'PUT',
        url: '/api/positions/' + id,
        data: $(this).serialize(),
        success: handleEditPositionSuccess
      });
      $('.collapse').hide();
    });
  });

  //delete job post
  $jobsList.on('click', '.delete-post', function(e) {
    e.preventDefault();
    var id= $(this).closest('.post').data('position-id');
    console.log('id', id);
    $.ajax({
      method: 'DELETE',
      url: '/api/positions/' + id,
      success: handleDeletePositionSuccess
    });
  });

});

function handleEditPositionSuccess(data) {
  var editedPositionId = data._id;
  $.get('/api/positions/' + editedPositionId, function(data) {
    $('div[data-position-id=' + editedPositionId + ']').remove();
    render(data);
  });
}

function handleDeletePositionSuccess(data) {
  var deletedPositionId = data._id;
  console.log(data._id);
  $('div[data-position-id=' + deletedPositionId + ']').remove();
}

function render(position) {
  var html = jobsTemplate(position);
  $jobsList.prepend(html);
}
