/* * * * * * * * * * * * * * * * *
 * student_listing.js :
 * This file contains the logic for listing the students,
 * the dates of their evaluations and the logic to edit,
 * save and add student names.
 * 
 * Written by: pjcraig
 * Date: 8.24.2013
 * * * * * * * * * * * * * * * * */

db = $.couch.db("hps");

function updateStudents() {
  $("#student-listing").empty();

  db.view("hps/uniquenames?group=true", {
    success: function(data) {
      for (i in data.rows) {
        
        var name = data.rows[i].key;
        var dates = data.rows[i].value;
        
        $("#student-listing").append(
          '<div id="' + name.replace(' ', '') + '">' +
          '<li class=dropdown>' +
          '<a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">' +
          name +
          ' <i class="icon-chevron-down"></i></a>' +
          '<ul></ul></div>');
       
        name = name.replace(' ','');
        var namelist = '#' + name + ' ul';

        for (i in dates) {
          $(namelist).append('<li>'+dates[i]+'</li>');
        }

        $(namelist).hide();        

      }
    },
    error: function(data) {
      console.log(data);
    }
  });
}

$(document).ready(function() {
  updateStudents();


});
