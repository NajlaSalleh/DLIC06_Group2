
//print input to the card
  function printMe(){
    const templateIT=document.getElementById("box");
    const recipient=document.getElementById("recipient").value;
    const inviter=document.getElementById("inviter").value;
    const eventname=document.getElementById("event").value;
    const date=document.getElementById("date").value;
    const additional=document.getElementById("additional").value;
    const preevent=document.getElementById("preevent").value;
    const pregreet=document.getElementById("pregreet").value;
    const custom=document.getElementById("custom").value;
    templateIT.innerHTML=
    `
      <p id="rp">`+recipient+`</p>
      <p id="in">`+inviter+`</p>
      <p id="even">`+eventname+`</p>
      <p id="dat">`+date+`</p>
      <p id="add">`+additional+`</p>
      <p id="pree">`+preevent+`</p>
      <p id="preg">`+pregreet+`</p>
      <p id="ctom">`+custom+`</p>

    `;
      document.getElementById("rp").style.fontSize=document.getElementById("size-rp").value+"px";
      document.getElementById("in").style.fontSize=document.getElementById("size-in").value+"px";
      document.getElementById("even").style.fontSize=document.getElementById("size-ev").value+"px";
      document.getElementById("dat").style.fontSize=document.getElementById("size-date").value+"px";
      document.getElementById("add").style.fontSize=document.getElementById("size-add").value+"px";
      document.getElementById("pree").style.fontSize=document.getElementById("size-pree").value+"px";
      document.getElementById("preg").style.fontSize=document.getElementById("size-preg").value+"px";
      document.getElementById("ctom").style.fontSize=document.getElementById("size-custom").value+"px";
    return false; //prevent form refresh
  }

//markfav
    function markasFav(){

    //to assign values from HTML
    var recipient=document.getElementById('recipient').value;
    var inviter=document.getElementById('inviter').value;
    var nameEvent=document.getElementById('even').value;
    var dateEvent=document.getElementById('date').value;
    var addText=document.getElementById('additional').value;
    var suggEvents=document.getElementById('preevent').value;
    var suggGreetings=document.getElementById('pregreet').value;
    var customMsg = document.getElementById("custom").value;

  //to store
  //    localStorage.setItem("recipient-ls", recipient);
//      localStorage.setItem("inviter-ls", inviter);
  //    localStorage.setItem("event-ls", nameEvent);
  //    localStorage.setItem("date-ls", dateEvent);
//      localStorage.setItem("additional-ls", addText);
  //    localStorage.setItem("preevent-ls", suggEvents);
  //    localStorage.setItem("pregreet-ls", suggGreetings);
  //    localStorage.setItem("custom-ls", customMsg);

  //assign values from JS to HTML--retrieval
//      document.getElementById("recipient-ls").innerHTML = localStorage.getItem("recipient-ls");
  //    document.getElementById("inviter-ls").innerHTML = localStorage.getItem("inviter-ls");
//      document.getElementById("event-ls").innerHTML = localStorage.getItem("event-ls");
  //    document.getElementById("date-ls").innerHTML = localStorage.getItem("date-ls");
  //    document.getElementById("additional-ls").innerHTML = localStorage.getItem("additional-ls");
//      document.getElementById("preevent-ls").innerHTML = localStorage.getItem("preevent-ls");
  //    document.getElementById("pregreet-ls").innerHTML = localStorage.getItem("pregreet-ls");
//      document.getElementById("custom-ls").innerHTML = localStorage.getItem("custom-ls");


      var arrayFavCards=[]; //array to be filled with fav block (items) in localStorage

        //if ada data in the localstorage in key favouriteCards
        if (localStorage.getItem("favouritedCards") != null) {
            var stringJson = localStorage.getItem("favouritedCards");
            // get favouritedCards item in localStorage -> parse it into JSON object -> store in arrayFavCards
            arrayFavCards = JSON.parse(stringJson); //to enable JS to read the string as JSON / read this string as JSON
        }

        // create the item to be pushed (inserted)
        newItem = { "recipientName": recipient, "inviterName": inviter, "eventName": nameEvent,
         "eventDate": dateEvent, "additionalText": addText, "suggestedEvent": suggEvents,
         "suggestedGreets": suggGreetings, "customMessage": customMsg};

        // push the item to arrayFavCards
        arrayFavCards.push(newItem);

        //convert JSON into string pasal Localstorage only support string value
        var stringJson = JSON.stringify(arrayFavCards);

        // convert arrayFavCards into string -> store in localStorage under favoritedCards item
        localStorage.setItem("favouritedCards", stringJson);

        // fill fav cards in the empty array
        document.getElementById("favouritedCards").innerHTML = '';
        displayFavCards();

        return false;
    }
//display favcard
    function displayFavCards() {
        if (localStorage.getItem("favouritedCards") != null) {

            // get favouritedCards item in localStorage -> parse it into JSON object -> store in arrayFavCards
            var arrayFavCards = JSON.parse(localStorage.getItem("favouritedCards"));

            // display all items in getFavCards
            for (var i in arrayFavCards) {
                var div = document.createElement('div');
                div.setAttribute('class', 'favItem');
                var card = arrayFavCards[i];
                div.innerHTML =

                 `
                    <strong>Name:</strong> ` + card.recipientName + `<br>
                    <strong>Inviter:</strong> ` + card.inviterName + `<br>
                    <strong>Event:</strong> ` + card.eventName + `<br>
                    <strong>Date:</strong> ` + card.eventDate + `<br>
                    <strong>Additional Text</strong> ` + card.additionalText + `<br>
                    <strong>Picked event</strong> ` + card.suggestedEvent + `<br>
                    <strong>Picked greeting</strong> ` + card.suggestedGreets + `<br>
                    <strong>Custom message:</strong> ` + card.customMessage + `<br>
                    <button type="button" onclick="removeData(` + i + `)">X</button>
                    <button type="button" onclick='applyData(` + JSON.stringify(card) + `)';>Use</button>
                `;
                document.getElementById("favouritedCards").appendChild(div);
            }

        }
    }
//apply data to the input
    function applyData(cardObj) { //or by using key
        document.getElementById("recipient").value = cardObj.recipientName;
        document.getElementById("inviter").value = cardObj.inviterName;
        document.getElementById("even").value = cardObj.eventName;
        document.getElementById("date").value = cardObj.eventDate;
        document.getElementById("additional").value = cardObj.additionalText;
        document.getElementById("preevent").value = cardObj.suggestedEvent;
        document.getElementById("pregreet").value = cardObj.suggestedGreets;
        document.getElementById("custom").value = cardObj.customMessage;
    }

//remove data from array
    function removeData(index) {
        if (localStorage.getItem("favouritedCards") != null) {
            // get favouritedCards item in localStorage -> parse it into JSON object -> store in getFavCards
            var arrayFavCards = JSON.parse(localStorage.getItem("favouritedCards"));
            arrayFavCards.splice(index, 1);

            // convert arrayFavCards into string -> store in localStorage under favoritedCards item
            localStorage.setItem("favouritedCards", JSON.stringify(arrayFavCards));

            // display all items in getFavCards
            document.getElementById("favouritedCards").innerHTML = '';
            displayFavCards();
        }
    }

  //savepic function
    function savePic() {
        domtoimage.toBlob(document.getElementById('box'))
            .then(function(blob) {window.saveAs(blob, 'card_invitation.png');}
              );
                        }

//drag and drop function
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

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
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
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
    (function() {
    //display existing items in localStorage under favouriteCards
    displayFavCards();
