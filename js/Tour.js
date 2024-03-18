AFRAME.registerComponent("tour", {
  schema:{
    state:{type:"string",default:"places-list"},
    selectedCard:{type:"string",default:"#card1"}
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards();
  },
  tick:function(){
    const {state} = this.el.getAttribute("tour");
    if(state==="view"){
      this.hideEl([this.placesContainer])
      this.showView()
    }
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id:"captain-aero",
        url:"./assets/thumbnails/captain-aero-poster.jpg"
     },
     {
        id:"outer-space",
        url:"./assets/thumbnails/outer-space-poster.jpg"
     },
     {
        id:"spider-man",
        url:"./assets/thumbnails/spiderman-poster.jpg"
     },
     {
        id:"super-man",
        url:"./assets/thumbnails/superman-poster.jpg"
     }
    ];
    let prevoiusXPosition = -62.5;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 5;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position , item.id);

      // Thumbnail Element
      const thumbNail = this.createThumbNail(item);
      thumbNail.setAttribute("position",{ x:0, y:0, z:0.1 })
      borderEl.appendChild(thumbNail);


      // Title Text Element
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive:"plane",
      width:20,
      height:32, 
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1,
    });

    //Add cursor-listener component to the ring border entity to change it's color 
    //On Cursor 'mouseenter' and 'mouseleave' entity
    entityEl.setAttribute("cursor-listener", {});

    return entityEl;
  },
  createThumbNail: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive:"plane",
      width:18,
      height:30, 
    });
    entityEl.setAttribute("material", { src: item.url });

    return entityEl;
  },
  createTitleEl: function (position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 70,
      color: "#e65100",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    
    return entityEl;
  },
  hideEl:function(elList){
    elList.map(
      (el)=>{el.setAttribute("visible",false)}
    )
  },
  showView:function(){
    const {selectedCard} = this.data
    const sky_el = document.querySelector("#main-container")
    sky_el.setAttribute("material",{
      src:`./images/360_images/${selectedCard}/place-0.jpg`,color:"white"})
  }

});


