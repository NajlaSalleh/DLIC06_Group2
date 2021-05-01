/*function selectMsg(id) {
    var msgBtns = document.getElementsByClassName("greetMsg");
    var i;
    for (i = 0; i < msgBtns.length; i++) {
        msgBtns[i].disabled = false;
    }
    var selectedBtn = document.getElementById(id);
    selectedBtn.disabled = true;
}*/

function preview() {

     //assign values from HTML to js
    var eventName = document.getElementById("select").value;
    var recName = document.getElementById("inputRecipientName").value;
    var eventDate = document.getElementById("inputEventDate").value;
    var customMsg = document.getElementById("inputCustomMsg").value;
    var bgCol = document.getElementById("inputBgCol").value;
    var greetTxtCol = document.getElementById("inputGreetTxtCol").value;

    //replace existing text in the card
    document.getElementById("greetMsg").textContent = eventName;
    document.getElementById("recipientName").textContent = recName;
    document.getElementById("customMsg").textContent = customMsg;

    //format date to day and year: numeric, month: text.
    // if eventDate is equal to zero, the function start
    //join is the function join
    var formattedDate = "";
    if (eventDate != "") {
        let a = [{ day: 'numeric' }, { month: 'long' }, { year: 'numeric' }];
        formattedDate = join(new Date(eventDate), a, ' ');
    }

    document.getElementById("eventDate").textContent = formattedDate;
    document.getElementById("tmpl-one-preview").style.backgroundColor = bgCol;
    document.getElementById("greetMsg").style.color = greetTxtCol;

    return false; //prevent refresh
}

function join(t, a, s) {
    function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}

function markAsFav() {

    // assign values to js from HTML
    var recName = document.getElementById("inputRecipientName").value;
    var eventDate = document.getElementById("inputEventDate").value;
    var customMsg = document.getElementById("inputCustomMsg").value;
    var bgCol = document.getElementById("inputBgCol").value;
    var greetTxtCol = document.getElementById("inputGreetTxtCol").value;

    var arrayfavcards = []; //this array is going to be filled with favouritedCards item in localStorage

    //if ada data in the localstorage in favouriteCards
    if (localStorage.getItem("favouritedCards") != null) {
        var stringJson = localStorage.getItem("favouritedCards");
    // get fav items form LS -> parse it into JSON object -> store in arrayfavcards
        arrayfavcards = JSON.parse(stringJson); //allow JS to read the string as JSON format
    }

    // create a new item to be pushed (inserted)
    //the id is a new one, not from HTML or js
    //new ID created to assign js values to LS
    newItem = { "recipientName": recName, "eventDate": eventDate, "customMessage": customMsg, "bgColor": bgCol, "greetTxtColor": greetTxtCol };

    // push the new item above to arrayfavcards
    arrayfavcards.push(newItem);

    //convert JSON arrayfavcards into string cos LS only support string value
    var stringJson = JSON.stringify(arrayfavcards);

    // convert into string -> store in LS under favoritedCards item (new item)
    localStorage.setItem("favouritedCards", stringJson);


    // display items in array
    document.getElementById("favouritedCards").innerHTML = '';
    displayFavCards();

    return false;
}

function displayFavCards() {
    if (localStorage.getItem("favouritedCards") != null) {

        // get favouritedCards item in localStorage -> parse it into JSON object -> store in getFavCards
        var arrayfavcards = JSON.parse(localStorage.getItem("favouritedCards"));

        // display all items in getFavCards
        for (var i in arrayfavcards) {
            var div = document.createElement('div');
            div.setAttribute('class', 'favItem');
            var card = arrayfavcards[i];
            div.innerHTML = `
              <i> Name: ` + card.recipientName + `<br> </i>
              <i>  Event date: ` + card.eventDate + `<br> </i>
              <i>  Custom message: ` + card.customMessage + `<br> </i>
              <i>  Background color: <span style="background-color:` + card.bgColor + ` " class="preview-color"></span> <br> </i>
              <i>  Event Name color: <span style="background-color:` + card.greetTxtColor + ` " class="preview-color"></span><br> </i>
              <i>  <button type="button" class="btn btn-sm" onclick="removeData(` + i + `)">Discard</button> </i>
              <i>  <button type="button" class="btn btn-sm" onclick='applyData(` + JSON.stringify(card) + `)';>Use</button> </i>            `;
            document.getElementById("favouritedCards").appendChild(div);
        }


    }
}

function applyData(cardObj) { //or by using key
    document.getElementById("inputRecipientName").value = cardObj.recipientName;
    document.getElementById("inputEventDate").value = cardObj.eventDate;
    document.getElementById("inputCustomMsg").value = cardObj.customMessage;
    document.getElementById("inputBgCol").value = cardObj.bgColor;
    document.getElementById("inputGreetTxtCol").value = cardObj.greetTxtColor;
}

function removeData(index) {
    if (localStorage.getItem("favouritedCards") != null) {
        // get favouritedCards item in localStorage -> parse it into JSON object -> store in getFavCards
        var arrayfavcards = JSON.parse(localStorage.getItem("favouritedCards"));
        getFavCards.splice(index, 1);

        // convert getFavCards into string -> store in localStorage under favoritedCards item
        localStorage.setItem("favouritedCards", JSON.stringify(arrayfavcards));

        // display all items in getFavCards
        document.getElementById("favouritedCards").innerHTML = '';
        displayFavCards();
    }
}

//drag and drop function
//ev is event

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    var data = ev.dataTransfer.getData("Text");
    var imgsticker = document.getElementById(data);
    ev.target.appendChild(imgsticker);
    imgsticker.style.position = "absolute";
    imgsticker.style.zIndex = "1";
    dragElement(imgsticker);
    ev.preventDefault();
}


function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = dragMouseDown;


//|| is logical OR (boolean)
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

          // call a function whenever the cursor moves:
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }

    function closeDragElement() {
        /* null action, when mouse button is released the data stops moving.*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


function() {
    //display existing items in localStorage under favouriteCards
    displayFavCards();

})();
