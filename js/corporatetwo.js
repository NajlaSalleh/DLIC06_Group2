function markFav() {

    var eventName = document.getElementById("select").value;
    var recName = document.getElementById("inputRecipientName").value;
    var eventDate = document.getElementById("inputEventDate").value;
    var customMsg = document.getElementById("inputCustomMsg").value;
    var fontFam = document.getElementById("inputFontFam").value;
    var arrayfavcards = [];

    if (localStorage.getItem("favBlock") != null) {
        var stringJson = localStorage.getItem("favBlock");
        arrayfavcards = JSON.parse(stringJson);
    }

    newBlock = { "eventGreeting": eventName, "recipientName": recName, "eventDate":
    eventDate, "customMessage": customMsg, "fontFamily": fontFam };

    arrayfavcards.push(newBlock);

    var stringJson = JSON.stringify(arrayfavcards);
    localStorage.setItem("favBlock", stringJson);
    document.getElementById("favBlock").innerHTML = '';

    displayFavBlock();

    return false;
}

function displayFavBlock() {
    if (localStorage.getItem("favBlock") != null) {

        var arrayfavcards = JSON.parse(localStorage.getItem("favBlock"));

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
              <i>  <button type="button" class="btn" onclick="discardData(` + i + `)"> Discard </button> </i>
              <i>  <button type="button" class="btn" onclick='retrieveData(` + JSON.stringify(card) + `)';> Retrieve </button> </i>
                           `;

            document.getElementById("favBlock").appendChild(div);
        }
    }
}

function retrieveData(cardElement) {
    document.getElementById("select").value = cardElement.eventGreeting;
    document.getElementById("inputRecipientName").value = cardElement.recipientName;
    document.getElementById("inputEventDate").value = cardElement.eventDate;
    document.getElementById("inputCustomMsg").value = cardElement.customMessage;
    document.getElementById("inputFontFam").value = cardElement.fontFamily;
}

function discardData(index) {
    if (localStorage.getItem("favBlock") != null) {
        var arrayfavcards = JSON.parse(localStorage.getItem("favBlock"));
        arrayfavcards.splice(index, 1);
        localStorage.setItem("favBlock", JSON.stringify(arrayfavcards));
        document.getElementById("favBlock").innerHTML = '';
        displayFavBlock();
  }
}


function preview() {

    var eventName = document.getElementById("select").value;
    var recName = document.getElementById("inputRecipientName").value;
    var eventDate = document.getElementById("inputEventDate").value;
    var customMsg = document.getElementById("inputCustomMsg").value;
    var fontFam = document.getElementById("inputFontFam").value;
    var formattedDate = "";
    if (eventDate != "") {
        let x = [{day: "numeric"}, { month: "long"}, { year: "numeric"}];
        formattedDate = join(new Date(eventDate), x, " ");
                          }

    document.getElementById("greetMsg").textContent = eventName;
    document.getElementById("recipientName").textContent = recName;
    document.getElementById("customMsg").textContent = customMsg;
    document.getElementById("tmpl-two-preview").style.fontFamily = fontFam;
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


function allowDrop(ev) {
      ev.preventDefault();
}

function drop(ev) {
      var data = ev.dataTransfer.getData("Text");
      var image = document.getElementById(data);
      ev.target.appendChild(image);
      image.style.position = "absolute";
      image.style.zIndex = "1";
      dragElement(image);
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
      displayFavBlock();
  })();
