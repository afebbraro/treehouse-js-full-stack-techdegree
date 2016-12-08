/*
Project Instructions
Set focus on the first text field
    When the page loads, give focus to the first text field
”Job Role” section of the form:
    A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
    Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
”T-Shirt Info” section of the form:
    For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
    If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
”Register for Activities” section of the form:
    Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
    When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
    As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
Payment Info section of the form:
    Display payment sections based on the payment option chosen in the select menu
    The "Credit Card" payment option should be selected by default, display the #credit-card div, and hide the "Paypal" and "Bitcoin information.
    When a user selects the "PayPal" payment option, the Paypal information should display, and the credit card and “Bitcoin” information should be hidden.
    When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
*/

function setFocus(el) {
    el.focus();
}

function revealOtherJobRoleField() {
    var selectJobRole = document.getElementById('title'),
        fieldsetBasicInfo = document.getElementById('js-basic-info'),
        otherTitle = document.createElement('input');

    // Listen for other option to be selected , id="title"
    selectJobRole.addEventListener('change', function() {
        // When other is selected
        if (this.value === 'other') {
            // Set as a text field
            otherTitle.type = 'text';

            // With id “other-title"
            otherTitle.id = 'other-title';

            // Placeholder text of 'Your Job Role'
            otherTitle.placeholder = 'Your Job Role';

            // Insert it into bottom of first fieldset
            fieldsetBasicInfo.appendChild(otherTitle);
        }
    });
}

// For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu
function shirtDesignColors() {
    var selectShirtDesign = document.getElementById('design'),
        selectColors = document.getElementById('color'),
        options =[];

        for (var i = 0; i < 6; i++) {
            options[i] = document.createElement('option');
        }

        options[0].value = 'cornflowerblue';
        options[1].value = 'darkslategrey';
        options[2].value = 'gold';
        options[3].value = 'tomato';
        options[4].value = 'steelblue';
        options[5].value = 'dimgrey';

        options[0].text = 'Cornflower Blue (JS Puns shirt only)';
        options[1].text = 'Dark Slate Grey (JS Puns shirt only)';
        options[2].text = 'Gold (JS Puns shirt only)';
        options[3].text = 'Tomato (I \u2665 JS shirt only)';
        options[4].text = 'Steel Blue (I \u2665 JS shirt only)';
        options[5].text = 'Dim Grey (I \u2665 JS shirt only)';

    // Listen for other shirt design to be selected
    selectShirtDesign.addEventListener('change', function() {
        // remove all options
        selectColors.innerHTML = '';

        // If user selects Theme - JS Puns
        if (this.value === 'js puns') {
            // add correct color options
            selectColors.appendChild(options[0]);
            selectColors.appendChild(options[1]);
            selectColors.appendChild(options[2]);
        } else { // User selects 'Theme - I ♥ JS'
        // add correct color options
            selectColors.appendChild(options[3]);
            selectColors.appendChild(options[4]);
            selectColors.appendChild(options[5]);
        }
    });
}

var activityFieldset = document.getElementById('js-activities'),
    totalPrice = 0,
    totalMsg = document.createElement('p');

// If the user selects a workshop, don't allow selection of a workshop at the same date and time
function workshopCheckboxes() {
    for (var i = 1; i < activityFieldset.children.length; i++) {
        activityFieldset.children[i].querySelector('input[type=checkbox]').addEventListener('change', function() {
            if (this.checked) {
                if (this.name === 'js-frameworks') {
                    activityFieldset.querySelector('input[name=express]').disabled = true;
                } else if (this.name === 'express') {
                    activityFieldset.querySelector('input[name=js-frameworks]').disabled = true;
                } else if (this.name === 'js-libs') {
                    activityFieldset.querySelector('input[name=node]').disabled = true;
                } else if (this.name === 'node') {
                    activityFieldset.querySelector('input[name=js-libs]').disabled = true;
                }
            } else if (this.checked === false && this.name === 'js-frameworks') {
                activityFieldset.querySelector('input[name=express]').disabled = false;
            } else if (this.checked === false && this.name === 'express') {
                activityFieldset.querySelector('input[name=js-frameworks]').disabled = false;
            } else if (this.checked === false && this.name === 'js-libs') {
                activityFieldset.querySelector('input[name=node]').disabled = false;
            } else if (this.checked === false && this.name === 'node') {
                activityFieldset.querySelector('input[name=js-libs]').disabled = false;
            } else {
                activityFieldset.querySelector('input[name=node]').disabled = false;
                activityFieldset.querySelector('input[name=js-libs]').disabled = false;
                activityFieldset.querySelector('input[name=js-frameworks]').disabled = false;
            }
            runningTotal(this);
        });
    }
}

function runningTotal(thisCheckbox) {
    if (thisCheckbox.checked) {
        if (thisCheckbox.name === 'all') {
            totalPrice += 200;
        } else {
            totalPrice += 100;
        }
    } else if (thisCheckbox.checked === false && thisCheckbox.name === 'all') {
        totalPrice -= 200;
    } else {
        totalPrice -= 100;
    }
    totalMsg.innerHTML = 'Total: $' + totalPrice;
    activityFieldset.appendChild(totalMsg);
}

function payment() {
    // The "Credit Card" payment option should be selected by default,
    document.getElementById('payment').value = 'credit card';
    document.getElementById('js-paypal-info').classList.add('is-hidden');
    document.getElementById('js-bitcoin-info').classList.add('is-hidden');

    document.getElementById('payment').addEventListener('change', function() {
        if (document.getElementById('payment').value === 'credit card') {
            document.getElementById('js-paypal-info').classList.add('is-hidden');
            document.getElementById('credit-card').classList.remove('is-hidden');
            document.getElementById('js-bitcoin-info').classList.add('is-hidden');
        } else if (document.getElementById('payment').value === 'paypal') {
            console.log('paypal');
            document.getElementById('js-paypal-info').classList.remove('is-hidden');
            document.getElementById('js-bitcoin-info').classList.add('is-hidden');
            document.getElementById('credit-card').classList.add('is-hidden');
        } else if (document.getElementById('payment').value === 'bitcoin') {
            console.log('bitcoin');
            document.getElementById('js-paypal-info').classList.add('is-hidden');
            document.getElementById('js-bitcoin-info').classList.remove('is-hidden');
            document.getElementById('credit-card').classList.add('is-hidden');
        } else {
            document.getElementById('js-paypal-info').classList.add('is-hidden');
            document.getElementById('js-bitcoin-info').classList.add('is-hidden');
            document.getElementById('credit-card').classList.add('is-hidden');
        }
    })
}

window.onload = function() {
    // When the page loads, give focus to the first text field
    setFocus(document.getElementById('name'));

    revealOtherJobRoleField();

    shirtDesignColors();

    workshopCheckboxes();

    payment();
};
