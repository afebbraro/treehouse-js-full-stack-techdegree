// get the number of students in the list by doing a query on the studentlist ul for li elements, type = num
var students = document.getElementById('js-student-list').querySelectorAll('li'),
    paginationDiv = document.getElementById('js-pagination'),
    showLimit = 10,
    pagesNeeded,
    newUl = document.createElement('ul'),
    pagLinks = paginationDiv.getElementsByTagName('a');

// function to create pagination HTML
// <div class="pagination">
//   <ul>
//     <li>
//       <a class="active" href="#">1</a>
//     </li>
//      <li>
//       <a href="#">2</a>
//     </li>
//      <li>
//       <a href="#">3</a>
//     </li>
//      <li>
//       <a href="#">4</a>
//     </li>
//      <li>
//       <a href="#">5</a>
//     </li>
//   </ul>
// </div>
function addPaginationLinks() {
    // add the newly created element and its content into the DOM
    // calculate the # of pages needed
    pagesNeeded = students.length / showLimit; // students.length = typeof number

    // rounding up
    pagesNeeded = Math.ceil(pagesNeeded);

    // remove the hide class to display the div
    paginationDiv.classList.remove('hide');

    for (var i = 1; i < pagesNeeded + 1; i++) {
        var newLi = document.createElement('li'),
            newLink = document.createElement('a');

        // append a to li
        newLi.appendChild(newLink);
        newLink.href = '#' + i;

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
        }

        // add active class to the clicked link
        this.classList.add('active');

        // When a user clicks on first link in pagination list students 1 through 10 are shown and the rest are hidden
        if (this.href='#1') {
            for (var i = 0; i < showLimit; i++) {
                students[i].classList.add('show');
            }
        } else if (this.href='#2') { // students 11 through 20 are shown, rest hidden
            for (var i = 11; i < 21; i++) {
                students[i].classList.add('show');
            }
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

    // When a user clicks on third link in pagination list then students 21 through 30 are shown, rest hidden
    // When a user clicks on fourth link in pagination list then students 31 through 40 are shown, rest hidden

    // When a user clicks on fifth link in pagination list then students 41 through 50 are shown, rest hidden


    // should work for any number of students

};
