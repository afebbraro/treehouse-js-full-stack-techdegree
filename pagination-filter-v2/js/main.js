/*
    Project Instructions
    When the page loads, your program should hide all but the first 10 students in the list.
    Look at the HTML in the example-meets.html on lines 119-137 -- this is an example of the markup you'll need to add dynamically to the index.html page to create pagination links.
    Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number of links to the bottom of the page.
    When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.
    Your program should work for any number of students. There are 54 students in index.html, but you can test your code by adding the JavaScript file your write to the other lists of students we’ve provided in the student-list-examples folder.
*/

// get the number of students in the list by doing a query on the studentlist ul for li elements, type = num
var students = document.getElementById('js-student-list'), // student list
    paginationDiv = document.getElementById('js-pagination'),
    showLimit = 10, // max number of students to show per page
    newUl = document.createElement('ul'), // ul for the page links
    pagLinks = paginationDiv.getElementsByTagName('a'),
    // convert students(nodelist) to an Array
    studentsArray = Array.apply(null, students.querySelectorAll('li'));


// function to create pagination HTML
function addPaginationLinks() {
    // add the newly created element and its content into the DOM
    // calculate the # of pages needed
    var pagesNeeded = studentsArray.length / showLimit; // studentsArray.length = typeof number

    // rounding up so we don't lose students
    pagesNeeded = Math.ceil(pagesNeeded);

    // remove the hide class to display the paginationDiv
    paginationDiv.classList.remove('hide');

    for (var i = 1; i < pagesNeeded + 1; i++) {
        var newLi = document.createElement('li'),
            newLink = document.createElement('a');

        // append a to li
        newLi.appendChild(newLink);
        newLink.dataset.group = i;

        // add page number to link
        newLink.innerHTML = i;

        // append li to parent container (ul)
        newUl.appendChild(newLi);
    }

    // add new html elements to now visiable div
    paginationDiv.appendChild(newUl);
}

function activateLink(link, thisThing) {
    // remove active class from all links
    for (var i = 0; i < pagLinks.length; ++i) {
        var link = pagLinks[i];
        link.classList.remove('active');
    }

    // add active class to the clicked link
    thisThing.classList.add('active');
    paginateStudents(parseInt(link.dataset.group));
}

function paginateStudents(pagNum) {
    var rangeArray,
        rangeMax,
        rangeMin;

    // ex. 10 = 1 * 10
    rangeMax = pagNum * showLimit;

    // ex. 0 = 10 - 10
    rangeMin = rangeMax - showLimit;

    // define the range of students
    rangeArray = studentsArray.slice(rangeMin,rangeMax);

    // iterate through all students and apply hide class
    for (var y = 0; y < studentsArray.length; ++y) {
        // add each student to the array
        var individualStudent = studentsArray[y];

        // if student doesn't have hide, add it
        if (!individualStudent.classList.contains('hide')) {
            individualStudent.classList.add('hide');
        }

        // if student has show class, remove it
        if (individualStudent.classList.contains('show')) {
            individualStudent.classList.remove('show');
        }
    }

    // iterate through the students in the range and show them
    for (var x = 0; x < rangeArray.length; ++x) {
        var student = rangeArray[x];

        if (individualStudent.classList.contains('hide')) {
            student.classList.remove('hide');
        }

        student.classList.add('show');
    }
}

function searchStudents() {
    // construct search box html
    var newDiv = document.createElement('div'),
        newInput = document.createElement('input'),
        newButton = document.createElement('button');

        // add input and btn to search box div
        newDiv.appendChild(newInput);
        newDiv.appendChild(newButton);

        // add class name, input placeholder txt and btn text
        newDiv.className = 'student-search';
        newInput.placeholder = 'Search for students...';
        newButton.innerHTML = 'Search';
        newInput.id = 'js-search-box'

        // append new search box div inside the page header
        document.getElementById('js-page-header').appendChild(newDiv);

        // on click call searchFilter func
        newButton.addEventListener('click', searchFilter, false);
}

function clearStudents() {
    // empty out students list
    for (var a = 0; a < studentsArray.length; a++) {
        if (studentsArray[a].classList.contains('show')) {
            studentsArray[a].classList.remove('show');
        }

        studentsArray[a].classList.add('hide');
    }
}

function searchFilter() {
    var searchTerm = document.getElementById('js-search-box').value, // get text that user typed in search box
        errorMsgNode = document.createTextNode('Sorry, there are no matches.'),
        errorMsgLi = document.createElement('li');

    errorMsgLi.id = 'js-search-box-error-msg';
    searchTerm = searchTerm.toLowerCase();

    // matches is an array
    var matches = studentsArray.filter(function(el) {
        return (el.getElementsByTagName('h3')[0].textContent === searchTerm);
    });

    // check if there are matches
    if (searchTerm !== '') {
        if (matches.length === 0) {
            // hide the student list
            clearStudents();

            // insert text msg into li element
            errorMsgLi.appendChild(errorMsgNode);

            // insert error msg li into page
            students.appendChild(errorMsgLi);
        } else { // there are matches
            // hide the student list
            clearStudents();

            // show matches
            for (var i = 0; i < matches.length; i++) {
                students.appendChild(matches[i]);
                matches[i].classList.add('show'); // need to show each match individually
            }
        }
        // hide page links
        paginationDiv.classList.add('hide');
    } else { // search field is submitted empty
        // hide the error msg
        var errorMsg = document.getElementById('js-search-box-error-msg');
        if (errorMsg) {
            errorMsg.classList.add('hide');
            paginateStudents(1);
            paginationDiv.classList.remove('hide');
            paginationDiv.classList.add('show');
        }
    }
}

window.onload = function() {
    // call functions
    addPaginationLinks();
    searchStudents();

    // iterate through links and add an event listener on each link that calls activateLink on click
    for (var i = 0; i < pagLinks.length; ++i) {
        var link = pagLinks[i];
        var thisThing = this;
        link.addEventListener('click', activateLink(link, thisThing), false);
    }

    activateLink(pagLinks[0]); // add class to first page link
    paginateStudents(1); // set 1st page list of students as default on page load
};
