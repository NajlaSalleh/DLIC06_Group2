function markFav() {

    var eventName = document.getElementById("select").value;
    var recName = document.getElementById("inputRecipientName").value;
    var eventDate = document.getElementById("inputEventDate").value;
    var customMsg = document.getElementById("inputCustomMsg").value;
    var fontFam = document.getElementById("inputFontFam").value;
    var arrayfavcards = [];

    if (localStorage.getItem("favouritedCards") != null) {
        var stringJson = localStorage.getItem("favouritedCards");
        arrayfavcards = JSON.parse(stringJson);
    }

    newBlock = { "eventGreeting": eventName, "recipientName": recName, "eventDate":
    eventDate, "customMessage": customMsg, "fontFamily": fontFam };

    arrayfavcards.push(newBlock);

    var stringJson = JSON.stringify(arrayfavcards);
    localStorage.setItem("favouritedCards", stringJson);
    document.getElementById("favouritedCards").innerHTML = '';

    displayFavCards();

    return false;
}

function displayFavCards() {
    if (localStorage.getItem("favouritedCards") != null) {

        var arrayfavcards = JSON.parse(localStorage.getItem("favouritedCards"));

        for (var i in arrayfavcards) {
            var div = document.createElement('div');
            div.setAttribute('class', 'favItem');
            var card = arrayfavcards[i];

            div.innerHTML = `
              <i>  Event Greetings: ` + card.eventGreeting + ` <br> </i>
              <i>  Name: ` + card.recipientName + `<br> </i>
              <i>  Event date: ` + card.eventDate + `<br> </i>
              <i>  Custom message: ` + card.customMessage + `<br> </i>
              <i>  Font style ` + card.fontFamily + `<br> </i>
              <i>  <button type="button" class="btn" onclick="removeData(` + i + `)"> Discard </button> </i>
              <i>  <button type="button" class="btn" onclick='applyData(` + JSON.stringify(card) + `)';> Retrieve </button> </i>
                           `;

            document.getElementById("favouritedCards").appendChild(div);
        }


    }
}

function applyData(cardObj) {
    document.getElementById("select").value = cardObj.eventGreeting;
    document.getElementById("inputRecipientName").value = cardObj.recipientName;
    document.getElementById("inputEventDate").value = cardObj.eventDate;
    document.getElementById("inputCustomMsg").value = cardObj.customMessage;
    document.getElementById("inputFontFam").value = cardObj.fontFamily;
                              }

function removeData(index) {
    if (localStorage.getItem("favouritedCards") != null) {
        var arrayfavcards = JSON.parse(localStorage.getItem("favouritedCards"));
        arrayfavcards.splice(index, 1);
        localStorage.setItem("favouritedCards", JSON.stringify(arrayfavcards));
        document.getElementById("favouritedCards").innerHTML = '';
        displayFavCards();
                              }
}


function preview() {

    var eventName = document.getElementById("select").value;
    var recName = document.getElementById("inputRecipientName").value;
    var eventDate = document.getElementById("inputEventDate").value;
    var customMsg = document.getElementById("inputCustomMsg").value;
    var fontFam = document.getElementById("inputFontFam").value;

    document.getElementById("greetMsg").textContent = eventName;
    document.getElementById("recipientName").textContent = recName;
    document.getElementById("customMsg").textContent = customMsg;
    document.getElementById("tmpl-one-preview").style.fontFamily = fontFam;


    var formattedDate = "";
    if (eventDate != "") {
        let a = [{day: "numeric"}, { month: "long"}, { year: "numeric"}];
        formattedDate = join(new Date(eventDate), a, " ");
                          }

    document.getElementById("eventDate").textContent = formattedDate;

    return false;
  }



  function join(t, a, s) {
   function format(m) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(t);}
      return a.map(format).join(s);
  }


  function drag(ev) {
      ev.dataTransfer.setData("Text", ev.target.id);
  }

  function drag(ev) {
      ev.dataTransfer.setData("Text", ev.target.id);
  }

  function allowDrop(ev) {
      ev.preventDefault();
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

  function dragElement(element) {
      var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
      element.onmousedown = dragMouseDown;

      function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          element.style.top = (element.offsetTop - pos2) + "px";
          element.style.left = (element.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
      }
  }


  (function() {
      displayFavCards();
  })();
