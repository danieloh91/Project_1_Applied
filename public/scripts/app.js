var jobsTemplate;
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

  $('.add-job').on('click', function(e){
    e.preventDefault();
    $('.add-job').hide();
    $('.question').show();
  });

  $('.add-yes').on('click', function(e){
    e.preventDefault();
    $('.question').hide();
    $('.new-job-form').show();
  });

  //show companies
  $.get('/api/companies').success(function(companies) {
    // empty out the #job-postings ONLY when rerendering EVERYTHING (existing company, new position)
    // prepend when adding a single new company (new company, new position)
    companies.forEach(function(company) {
      console.log('calling GET Request', company);
      renderCompany(company);
      renderDropdown(companies);
    });
  });

  //add job post
  $('#new-job-form').on("submit", function(e) {
    console.log('calling on submit');
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('retreiving formData', formData);
    $.post('/api/positions', formData, function(company) {
      console.log('position after POST', company);
      renderCompany(company);
    });
    $(this).trigger("reset");
  });

  // add to existing job post
  $('#addon-job-form').on("submit", function(e) {
    var id=$('#company_name').val();
    console.log(id);
    e.preventDefault();
    $.ajax({
      method: 'PUT',
      url: '/api/companies/' + id,
      data: $(this).serialize(),
      success: handleEditCompanySuccess
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

function handleEditCompanySuccess(data){
  var editedCompanyId = data.id;
  $.get('/api/companies/' + editedCompanyId, function(data){
    renderCompany(data);
  });
}

function handleEditPositionSuccess(data) {
  var editedPositionId = data._id;
  $.get('/api/companies/' + editedPositionId, function(data) {
    $('div[data-position-id=' + editedPositionId + ']').remove();
    renderCompany(data);
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

function renderDropdown(companies) {
  var dropdownHtml = $('#companies').html();
  var dropdownTemplate = Handlebars.compile(dropdownHtml);
  var renderedDropdown = dropdownTemplate({
    companies: companies
  });
  $('#company_name').html(renderedDropdown);
}

function renderCompany(company) {
  // $jobsList.empty();
  var html = companiesTemplate(company);
  $jobsList.prepend(html);
}
