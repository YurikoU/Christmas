// https://youtu.be/a1rAuW2G1JI




class Snow {
    constructor ( x, y ) {
        this.elm = document.createElement("div");
        document.body.appendChild( this.elm );
        this.sty = this.elm.style;

        this.x       = x;
        this.y       = y;
        this.vectorX = randomInt( -1, 1 );
        this.vectorY = randomInt(  3, 5 );

        this.sty.position = "fixed";
        this.sty.left     = this.x + "px";
        this.sty.top      = this.y + "px";

        let size                 = randomInt( 5, 10 );
        let opacity              = randomInt( 5, 10 );
        this.sty.width           = size + "px";
        this.sty.height          = size + "px";
        this.sty.borderRadius    = "50%";
        this.sty.opacity         = opacity / 10;//from 0.5 to 1.0
        this.sty.backgroundColor = "#EEF";
    }

    update () {
        this.x += this.vectorX;
        this.y += this.vectorY;

        //The coordinate will be reset, once the snow flake reaches the bottom
        if ( screenHeight <= this.y ) {
            this.x = randomInt( 0, screenWidth );
            this.y = -10;
        }

        this.sty.left = this.x + "px";
        this.sty.top  = this.y + "px";
    }
}

//Store snow objects
let snowFlakes = [];

//Screen size
let screenWidth  = window.innerWidth;
let screenHeight = window.innerHeight;

//Generate a random integer from min to max
function randomInt ( min, max ) {
    return Math.floor( Math.random() * (max-min+1) + min );
} 


for ( let i = 0; i < 100; i++ ) {
    let x = randomInt( 0, screenWidth );
    let y = randomInt( 0, screenHeight );

    snowFlakes.push( new Snow( x, y ) );
}

setInterval( mainLoop, 1000/20 );

function mainLoop () {
    for ( let i = snowFlakes.length-1; 0 <= i; i-- ) {
        snowFlakes[ i ].update();
    }
}

