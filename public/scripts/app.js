var jobsTemplate;
var $jobsList;

$(document).ready(function() {
  var companyHtml = $('#company-template').html(),
      baseUrl = '/api/companies';
      companiesTemplate = Handlebars.compile(companyHtml);

      $jobsList = $('#job-postings');

  /* TODO: Please remove commented code form production versions of your project -jc */
  // //show jobs
  // $.get('/api/positions').success(function(positions) {
  //   positions.forEach(function(position) {
  //     console.log('calling GET Request', position);
  //     render(position);
  //   });
  // });


  /* TODO: Consider moving the callback function to an external, named function for a smaller and easier to read document ready section -jc */
  /* TODO: Consider giving the function a name that informs the developer what the cb does.
  $('.add-job').click(function(e){
    e.preventDefault();
    $('.add-job').hide();
    $('.question').show();
  });

  /* TODO: Consider moving the callback function to an external, named function for a smaller and easier to read document ready section -jc */
  /* TODO: Consider giving the function a name that informs the developer what the cb does.*/
  $('.add-yes').click(function(e){
    e.preventDefault();
    $('.question').hide();
    $('.new-job-form').show();
  });

  //show companies
  /* TODO: Consider moving the callback function to an external, named function for a smaller and easier to read document ready section -jc */
  /* TODO: Consider giving the function a name that informs the developer what the cb does.*/
  $.get('/api/companies').success(function(companies) {
    // empty out the #job-postings ONLY when rerendering EVERYTHING (existing company, new position)
    // prepend when adding a single new company (new company, new position)
    companies.forEach(function(company) {
      /* TODO: Please keep debugging code out of production versions of your project -jc */
      console.log('calling GET Request', company);
      renderCompany(company);
      renderDropdown(companies);
    });
  });

  //add job post
  /* TODO: Consider moving the callback function to an external, named function for a smaller and easier to read document ready section -jc */
  /* TODO: Consider giving the function a name that informs the developer what the cb does.*/
  $('#new-job-form').on("submit", function(e) {
    /* TODO: Please keep debugging code out of production versions of your project -jc */
    console.log('calling on submit');
    e.preventDefault();
    var formData = $(this).serialize();
    /* TODO: Please keep debugging code out of production versions of your project -jc */
    console.log('retreiving formData', formData);
    $.post('/api/positions', formData, function(company) {
      /* TODO: Please keep debugging code out of production versions of your project -jc */
      console.log('position after POST', company);
      renderCompany(company);
    });
    $(this).trigger("reset");
  });

  // add to existing job post
  /* TODO: Consider moving the callback function to an external, named function for a smaller and easier to read document ready section -jc */
  /* TODO: Consider giving the function a name that informs the developer what the cb does.*/
  $('#addon-job-form').on("submit", function(e) {
    var id=$('#company_name').val();
    /* TODO: Please keep debugging code out of production versions of your project -jc */
    console.log(id);
    e.preventDefault();
    $.ajax({
      method: 'PUT',
      url: '/api/companies/' + id,
      /* TODO: For easier to read, consider assigning $(this).serialize() to a variable first. -jc */
      data: $(this).serialize(),
      success: handleEditCompanySuccess
    });
    $(this).trigger("reset");
  });

  //edit job post
  /* TODO: Consider moving the callback function to an external, named function for a smaller and easier to read document ready section -jc */
  /* TODO: Consider giving the function a name that informs the developer what the cb does.*/
  $jobsList.on('click', '.update-post', function(e) {
    e.preventDefault();
    var id= $(this).closest('.post').data('position-id');
    /* TODO: Please keep debugging code out of production versions of your project -jc */
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
    /* TODO: Consider moving the callback function to an external, named function for a smaller and easier to read document ready section -jc */
    /* TODO: Consider giving the function a name that informs the developer what the cb does.*/
    $('#update-post').on("submit", function(e) {
      e.preventDefault();
      $.ajax({
        method: 'PUT',
        url: '/api/positions/' + id,
        /* TODO: For easier to read, consider assigning $(this).serialize() to a variable first. -jc */
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
  /* TODO: Consider moving the callback function to an external, named function for a smaller and easier to read document ready section -jc */
  /* TODO: Consider giving the function a name that informs the developer what the cb does.*/
  $jobsList.on('click', '.delete-post', function(e) {
    e.preventDefault();
    var id= $(this).closest('.post').data('position-id');
    /* TODO: Please keep debugging code out of production versions of your project -jc */
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
  /* TODO: Streamline your code more by creating an url string to pass to the ajax get request instead of an in-place string assembly. -jc */
  $.get('/api/companies/' + editedCompanyId, function(data){
    renderCompany(data);
  });
}

function handleEditPositionSuccess(data) {
  var editedPositionId = data._id;
  /* TODO: Streamline your code more by creating an url string to pass to the ajax get request instead of an in-place string assembly. -jc */
  $.get('/api/companies/' + editedPositionId, function(data) {
    $('div[data-position-id=' + editedPositionId + ']').remove();
    renderCompany(data);
  });
}

function handleDeletePositionSuccess(data) {
  var deletedPositionId = data._id;
  /* TODO: Please keep debugging code out of production versions of your project -jc */
  console.log(data._id);
  $('div[data-position-id=' + deletedPositionId + ']').remove();
}

/* TODO: Please remove commented code form production versions of your project -jc */
// function render(position) {
//   var html = companiesTemplate(position);
//   $jobsList.prepend(html);
// }
/* TODO: You are calling this funtion n times - where n is the number of companies that exist in your database. This includes grabbing hte template html and compiling it repeatedly n times.  Try refactoring the template selector and the compilation call out of this function and into your doc.ready. This will greatly reduce the workload of your browser logic. -JC */
function renderDropdown(companies) {
  var dropdownHtml = $('#companies').html();
  var dropdownTemplate = Handlebars.compile(dropdownHtml);
  var renderedDropdown = dropdownTemplate({
    companies: companies
  });
  $('#company_name').html(renderedDropdown);
}

function renderCompany(company) {
  /* TODO: Please remove commented code form production versions of your project -jc */
  // $jobsList.empty();
  var html = companiesTemplate(company);
  console.log('html: ', html);
  $jobsList.prepend(html);
}
