// get the number of students in the list by doing a query on the studentlist ul for li elements, type = num
var students = document.getElementById('js-student-list').querySelectorAll('li'),
    paginationDiv = document.getElementById('js-pagination'),
    showLimit = 10,
    pagesNeeded,
    newUl = document.createElement('ul'),
    pagLinks = paginationDiv.getElementsByTagName('a'),
    studentsArray;

    // convert students(nodelist) to an Array
    studentsArray = Array.apply(null, students);

// function to create pagination HTML
function addPaginationLinks() {
    // add the newly created element and its content into the DOM
    // calculate the # of pages needed
    pagesNeeded = studentsArray.length / showLimit; // studentsArray.length = typeof number

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

window.onload = function() {
    function activateLink() {
        // remove active class from all links
        for (var i = 0; i < pagLinks.length; ++i) {
            var link = pagLinks[i];
            link.classList.remove('active');
            link.classList.remove('show');
        }

        // add active class to the clicked link
        this.classList.add('active');

        var pagNum = parseInt(this.dataset.group),
            rangeArray,
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


    // call functions
    addPaginationLinks();

    // iterate through the node list of links and add an event listener on each link that calls activateLink on click
    for (var i = 0; i < pagLinks.length; ++i) {
        var link = pagLinks[i];

        // call activateLink and add active class
        link.addEventListener('click', activateLink, false);
    }

    // trigger click on page load of first link in list
    pagLinks[0].click();
};
