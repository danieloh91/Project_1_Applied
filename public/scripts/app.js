var jobsTemplate;
// var allPositions = [];
var $jobsList;

$(document).ready(function() {
  var companyHtml = $('#company-template').html(),
      baseUrl = '/api/companies';
      companiesTemplate = Handlebars.compile(companyHtml);

  $jobsList = $('#job-postings');

  // //show jobs
  // $.get('/api/positions').success(function(positions) {
  //   positions.forEach(function(position) {
  //     console.log('calling GET Request', position);
  //     render(position);
  //   });
  // });

  //show companies
  $.get('/api/companies').success(function(companies) {
    // empty out the #job-postings ONLY when rerendering EVERYTHING (existing company, new position)
    // prepend when adding a single new company (new company, new position)
    companies.forEach(function(company) {
      console.log('calling GET Request', company);
      renderCompany(company);
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
    var id= $(this).closest('.post').data('position-id');
    console.log('id', id);

    var toggle_switch = $(this);
    $('.collapse').toggle(function(){
    	if($(this).css('display')=='none'){
    		toggle_switch.html();//change the button label to be 'Show'
    	}else{
    		toggle_switch.html();//change the button label to be 'Hide'
    	}
    });

    // $('.collapse').show();
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
    $('.cancel-edit').on('click', function(e) {
      $('.collapse').hide();
    });

    //show companies in drop down menu
    // $('#select').change(function(){
    //   var$dropdown = $(this);
    //   console.log('test');
    //
    //   $.getJSON("jsondata.data/json", function(data){
    //     var key = $dropdown.val();
    //     var vals = [];
    //     switch(key) {
    //       case 'companies':
    //         vals = data.company_name;
    //         break;
    //     }
    //   });
    // });


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

// function render(position) {
//   var html = companiesTemplate(position);
//   $jobsList.prepend(html);
// }

function renderCompany(company) {
  var html = companiesTemplate(company);
  $jobsList.prepend(html);
}
