
  function printMe(){
    const template=document.getElementById("template");
    const recipient=document.getElementById("recipient").value;
    const inviter=document.getElementById("inviter").value;
    const eventname=document.getElementById("event").value;
    const date=document.getElementById("date").value;
    const additional=document.getElementById("additional").value;
    const preevent=document.getElementById("preevent").value;
    const pregreet=document.getElementById("pregreet").value;
    const custom=document.getElementById("custom").value;

    template.innerHTML=
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


  function markFav(){

  //to assign values from HTML
  var recName = document.getElementById("recipient").value;
  var invName = document.getElementById("inviter").value;
  var eventName= document.getElementById("even").value;
  var eventDate = document.getElementById("date").value;
  var addText = document.getElementById("additional").value;
  var suggEvents = document.getElementById("preevent").value;
  var suggGreetings = document.getElementById("pregreet").value;
  var customMsg = document.getElementById("custom").value;

  //to store
    localStorage.setItem("recipient-ls", recName);
    localStorage.setItem("inviter-ls", invName);
    localStorage.setItem("event-ls", eventName);
    localStorage.setItem("date-ls", eventDate);
    localStorage.setItem("additional-ls", addText);
    localStorage.setItem("preevent-ls", suggEvents);
    localStorage.setItem("pregreet-ls", suggGreetings);
    localStorage.setItem("custom-ls", customMsg);

  //calling html punya ID to js file, then assign values to them here
    document.getElementById("recipient-ls").innerHTML = localStorage.getItem("recipient-ls");
    document.getElementById("inviter-ls").innerHTML = localStorage.getItem("inviter-ls");
    document.getElementById("event-ls").innerHTML = localStorage.getItem("event-ls");
    document.getElementById("date-ls").innerHTML = localStorage.getItem("date-ls");
    document.getElementById("additional-ls").innerHTML = localStorage.getItem("additional-ls");
    document.getElementById("preevent-ls").innerHTML = localStorage.getItem("preevent-ls");
    document.getElementById("pregreet-ls").innerHTML = localStorage.getItem("pregreet-ls");
    document.getElementById("custom-ls").innerHTML = localStorage.getItem("custom-ls");
  }

  var arrayFavCards=[] //array to be filled with fav block (items) in localStorage


      //if ada data in the localstorage in key favouriteCards
      if (localStorage.getItem("favouritedCards") != null) {
          var stringJson = localStorage.getItem("favouritedCards");
          // get favouritedCards item in localStorage -> parse it into JSON object -> store in getFavCards
          arrayFavCards = JSON.parse(stringJson); //to enable JS to read the string as JSON / read this string as JSON
      }

      // create the item to be pushed (inserted)
      newItem = { "recipient": recName, "eventDate": eventDate, "customMessage": customMsg, "bgColor": bgCol, "greetTxtColor": greetTxtCol };

      // push the item to the empty array
      arrayFavCards.push(newItem);

      //convert JSON into string pasal Localstorage only support string value
      var stringJson = JSON.stringify(arrayFavCards);

      // convert arrayFavCards into string -> store in localStorage under favoritedCards item
      localStorage.setItem("arrayFavCards", stringJson);

      // display all items in arrayFavCards
      document.getElementById("favouritedCards").innerHTML = '';
      displayFavCards();

      return false;
  }

  function displayFavCards() {
      if (localStorage.getItem("favouritedCards") != null) {

          // get favouritedCards item in localStorage -> parse it into JSON object -> store in arrayFavCards
          var getFavCards = JSON.parse(localStorage.getItem("favouritedCards"));

          // display all items in getFavCards
          for (var i in getFavCards) {
              var div = document.createElement('div');
              div.setAttribute('class', 'favItem');
              var card = getFavCards[i];
              div.innerHTML = `
                  <strong>Name:</strong> ` + card.recipientName + `<br>
                  <strong>Event date:</strong> ` + card.eventDate + `<br>
                  <strong>Custom message:</strong> ` + card.customMessage + `<br>
                  <strong>Bg color:</strong> <span style="background-color:` + card.bgColor + ` " class="preview-color"></span>&nbsp;&nbsp;<strong>Greeting txt color:</strong> <span style="background-color:` + card.greetTxtColor + ` " class="preview-color"></span><br>
                  <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeData(` + i + `)">X</button>
                  <button type="button" class="btn btn-sm btn-outline-primary" onclick='applyData(` + JSON.stringify(card) + `)';>Use</button>
              `;
              document.getElementById("favouritedCards").appendChild(div);
          }


      }
  }


  /*    //let there be light code

      var w = window.innerWidth;
      var h = window.innerHeight;

      var dustCanvas = document.getElementById('star');
      var dustCtx = dustCanvas.getContext('2d');
      var starCanvas = document.getElementById('dust');
      var starCtx = starCanvas.getContext('2d');


      dustCanvas.width = starCanvas.width = w;
      dustCanvas.height = starCanvas.height = h;

      dustCtx.globalCompositeOperation = 'lighter';
      starCtx.globalCompositeOperation = 'lighter';

      var galaxies = [];

      var mouse = {
        pos: {
          x: w * 0.5,
          y: h * 0.5
        },
        speed: 0
      };

      var randomNumbers = length => Array.from(new Array(length), () => Math.random());
      var PI = Math.PI;
      var TAU = PI * 2;
      var r = () => Math.random();
      var angle2 = (p1,p2) => Math.atan2(
        p2[1]-p1[1],
        p2[0]-p1[0]
      );
      var distance2 = (p1,p2) => Math.sqrt(
        Math.pow(p1[0]-p2[0], 2) +
        Math.pow(p1[1]-p2[1], 2)
      );

      var createDustParticle = (color) => {

        var canvas = document.createElement('canvas');

        var w = 100;
        var h = 100;
        var cx = w * 0.5;
        var cy = h * 0.5;

        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        canvas.ctx = ctx;

        var xRand = -5 + (r()*10);
        var yRand = -5 + (r()*10);
        var xRand2 = 10 + (r()*(cx/2));
        var yRand2 = 10 + (r()*(cy/2));

        var color = color || {
          r: Math.round(150+(r()*100)),
          g: Math.round(50+(r()*100)),
          b: Math.round(50+(r()*100))
        };

        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},.02)`;

        Array
          .from(new Array(200), () => randomNumbers(3))
          .forEach( (p,i,arr) => {
            var length = arr.length;

            var x = Math.cos( TAU/xRand/length*i ) * p[2]*xRand2 + cx;
            var y = Math.sin( TAU/yRand/length*i ) * p[2]*yRand2 + cy;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, p[2]*4, 0, TAU);
            ctx.fill();

          });

          return canvas;
      };

      var Galaxy = function(x,y) {

        var g = this;

        g.x = x;
        g.y = y;
        g.stars = [];
        g.dust = [];
        g.drag = r();

        g.angleOffsetX = TAU*r();
        g.angleOffsetY = TAU*r();
        g.realAngleOffsetX = 0;
        g.realAngleOffsetY = 0;

        g.color = {
          r: Math.round(50+(r()*100)),
          g: Math.round(50+(r()*100)),
          b: Math.round(150+(r()*100))
        };

        var calculateStarDustParams = o => {
          o.angle = angle2([g.x,g.y], [o.x,o.y]);
          o.distance = distance2([g.x,g.y], [o.x,o.y]);
          o.xAspect = [o.x/o.y];
          o.yAspect = [o.y/o.x];
        };

        g.calculateCenter = () => {
          if (!g.stars.length) return;
          g.x = g.stars
            .map(s => s.x)
            .reduce((previous,current) => previous + current)
            / g.stars.length;

          g.y = g.stars
            .map(s => s.y)
            .reduce((previous,current) => previous + current)
            / g.stars.length;

          g.stars.forEach(calculateStarDustParams);
          g.dust.forEach(calculateStarDustParams);
        };

      };

      var Star = function(x, y, spread) {
        var s = this;
        s.x = x + Math.cos(TAU*r()) * spread;
        s.y = y + Math.sin(TAU*r()) * spread;
        s.radius = r()+0.25;
        s.speed = r();
      };

      var Dust = function(x, y, size) {
        var d = this;
        d.x = x;
        d.y = y;
        d.size = size;
        d.texture = createDustParticle();
        d.speed = r();
      };

      var updateStarDust = (s,g) => {
        if (g == currentGalaxy && drawingMode) return;
        s.angle += (0.5+(s.speed*0.5))/s.distance;
        s.x = g.x + (Math.cos(s.angle+g.realAngleOffsetX)*s.distance);
        s.y = g.y + (Math.sin(s.angle+g.realAngleOffsetY)*s.distance);
      };

      var update = () => {
        galaxies.forEach(g => {
          if (g != currentGalaxy) {
            g.realAngleOffsetX +=
              g.realAngleOffsetX < g.angleOffsetX
              ? (g.angleOffsetX-g.realAngleOffsetX)*0.05 : 0;
            g.realAngleOffsetY +=
              g.realAngleOffsetY < g.angleOffsetY
              ? (g.angleOffsetY-g.realAngleOffsetY)*0.05 : 0;
          }
          g.stars.forEach((s) => {
            /*s.distance -= s.distance < 2
              ? 0
              : TAU/s.distance;*/
    /*        updateStarDust(s,g);
          });
          g.dust.forEach((d) => {
            /*d.distance -= d.distance < 50
              ? 0
              : TAU/d.distance;*/
        /*    updateStarDust(d,g);
          });
        });
      };

      var render = () => {

        dustCtx.globalCompositeOperation = 'source-over';
        dustCtx.fillStyle = 'rgba(0,0,0,.05)';
        dustCtx.fillRect(0,0,w,h);
        dustCtx.globalCompositeOperation = 'lighter';

        starCtx.clearRect(0,0,w,h);
        starCtx.fillStyle = '#ffffff';
        starCtx.strokeStyle = 'rgba(255,255,255,.05)';
        starCtx.beginPath();

        if (drawingMode) galaxies.forEach(g => {
          starCtx.moveTo(g.x, g.y);
          starCtx.arc(g.x,g.y,2,0,TAU);
        });

        galaxies.forEach(g => {
          g.stars.forEach(s => {
            starCtx.moveTo(s.x, s.y);
            starCtx.arc(s.x,s.y,s.radius,0,TAU);
          });
          g.dust.forEach(d => {
            dustCtx.drawImage(d.texture, d.x-(d.size*0.5), d.y-(d.size*0.5), d.size, d.size)
          });
        });

        dustCtx.fill();
        starCtx.fill();

        if (drawingMode && currentGalaxy) {
          starCtx.beginPath();
          currentGalaxy.stars.forEach((s,i) => {
              starCtx.moveTo(s.x, s.y);
              starCtx.lineTo(currentGalaxy.x, currentGalaxy.y);
          });
          starCtx.stroke();
        }

      };

      var currentGalaxy = null;

      var drawingMode = false;

      var activateDraw = e => {
        drawingMode = true;
        mouse.pos.x = e.layerX;
        mouse.pos.y = e.layerY;
        currentGalaxy = new Galaxy(e.layerX, e.layerY);
        galaxies.push(currentGalaxy);
      };
      var disableDraw = e => {

        drawingMode = false;
        currentGalaxy = null;
      };
      var draw = e => {
        if (!drawingMode) return;

        currentGalaxy.stars.push(new Star(mouse.pos.x, mouse.pos.y, mouse.speed));
        currentGalaxy.stars.push(new Star(mouse.pos.x, mouse.pos.y, mouse.speed));
        currentGalaxy.stars.push(new Star(mouse.pos.x, mouse.pos.y, mouse.speed));

        if (mouse.speed*1.5 > 13 && mouse.speed < 100) currentGalaxy.dust.push(
          new Dust(
            (currentGalaxy.x + (Math.cos(TAU*r()) * mouse.speed*0.1)),
            (currentGalaxy.y + (Math.sin(TAU*r()) * mouse.speed*0.1)),
            mouse.speed*1.5
          )
        );

        currentGalaxy.calculateCenter();

      };

      var loop = () => {
        draw();
        update();
        render();
        window.requestAnimationFrame(loop);
      };

      loop();

      var moveEvent = e => {
        mouse.speed =  distance2(
          [e.layerX,e.layerY],
          [mouse.pos.x,mouse.pos.y]
        );
        mouse.pos.x = e.layerX;
        mouse.pos.y = e.layerY;
        draw(e);
      };

      window.addEventListener('mousedown', activateDraw);
      window.addEventListener('mousemove', moveEvent);
      window.addEventListener('mouseup',disableDraw);

      window.addEventListener('touchstart', activateDraw);
      window.addEventListener('touchmove', moveEvent);
      window.addEventListener('touchend',disableDraw);

*/


//star background//


      "use strict";

    //  var canvas = document.getElementById('star'),
        ctx = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,

        hue = 217,
        stars = [],
        count = 0,
        maxStars = 1400;

      // Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
      // Cache gradient
      var canvas2 = document.createElement('canvas'),
          ctx2 = canvas2.getContext('2d');
          canvas2.width = 100;
          canvas2.height = 100;
      var half = canvas2.width/2,
          gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
          gradient2.addColorStop(0.025, '#fff');
          gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
          gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
          gradient2.addColorStop(1, 'transparent');

          ctx2.fillStyle = gradient2;
          ctx2.beginPath();
          ctx2.arc(half, half, half, 0, Math.PI * 2);
          ctx2.fill();

      // End cache

      function random(min, max) {
        if (arguments.length < 2) {
          max = min;
          min = 0;
        }

        if (min > max) {
          var hold = max;
          max = min;
          min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function maxOrbit(x,y) {
        var max = Math.max(x,y),
            diameter = Math.round(Math.sqrt(max*max + max*max));
        return diameter/2;
      }

      var Star = function() {

        this.orbitRadius = random(maxOrbit(w,h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 50000;
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
      }

      Star.prototype.draw = function() {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
          ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
      }

      for (var i = 0; i < maxStars; i++) {
        new Star();
      }

      function animation() {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
          ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        };

        window.requestAnimationFrame(animation);
      }

      animation();





//reference: Habibah Mahadi's github
