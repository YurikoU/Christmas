// https://youtu.be/a1rAuW2G1JI




const SNOW_MAX       = 100;
const SNOW_FPS       = 20;
const TYPE_SNOW      = 0;
const TYPE_SPARKLING = 1;
const TYPE_XMAS      = 2;
const BLOCK_SIZE     = 4;


class Snow {
    constructor ( ty, x, y, c, d ) {
        this.elm = document.createElement("div");
        document.body.appendChild( this.elm );
        this.sty = this.elm.style;

        this.type     = ty;
        this.x        = x;
        this.y        = y;
        this.color    = c;
        this.duration = d;

        this.sty.position = "fixed";
        this.sty.left     = this.x + "px";
        this.sty.top      = this.y + "px";

        let size;
        let opacity = randomInt( 5, 10 );
        if ( this.type == TYPE_SNOW ) {
            this.vectorX = randomInt( -1, 1 );
            this.vectorY = randomInt(  3, 5 );
            size = randomInt( 5, 10 );
        } else if ( this.type == TYPE_SPARKLING ) {
            this.vectorX = randomInt( -8, 8 );
            this.vectorY = randomInt( -8, 8 );
            size = 8;
        }
        
        this.sty.width           = size + "px";
        this.sty.height          = size + "px";
        this.sty.borderRadius    = "50%";
        this.sty.opacity         = opacity / 10;//from 0.5 to 1.0
        this.sty.backgroundColor = this.color;

        this.isKillingItself = false;
    }

    update () {
        this.x += this.vectorX;
        this.y += this.vectorY;

        if ( this.type == TYPE_SNOW ) {
            //The coordinate will be reset, once the snow flake reaches the bottom
            if ( screenHeight <= this.y ) {
                this.x = randomInt( 0, screenWidth );
                this.y = -10;
            }
        } else if ( this.type == TYPE_SPARKLING ) {
            if ( --this.duration == 0 ) { 
                this.isKillingItself = true;
                document.body.removeChild( this.elm );
                return;
            }

            if ( this.duration < 10 ) {
                this.sty.opacity = this.duration / 10;//from 0.9 to 0.1
            } else {
                this.sty.opacity = 1.0;
            }

            this.vectorY++;//Give the sparkling the gravity

            if ( randomInt(0,5) == 1 ) {
                this.sty.backgroundColor = "#FFF";
                this.sty.opacity = 1.0;
            } else {
                this.sty.backgroundColor = this.color;
            }
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


for ( let i = 0; i < SNOW_MAX; i++ ) {
    let x = randomInt( 0, screenWidth );
    let y = randomInt( 0, screenHeight );
    snowFlakes.push( new Snow( TYPE_SNOW, x, y, "#EEF", 0 ) );
}

setInterval( mainLoop, 1000/SNOW_FPS );

function mainLoop () {
    for ( let i = snowFlakes.length-1; 0 <= i; i-- ) {
        snowFlakes[ i ].update();

        if ( snowFlakes[ i ].isKillingItself ) { 
            snowFlakes.splice( i, 1 );
            return;
        }
    }
}

//Once a user move the mouse, the cursor looks sparkling
document.onmousemove = function ( e ) {
    let x = e.clientX;
    let y = e.clientY;
    snowFlakes.push( new Snow( TYPE_SPARKLING, x, y, "#F66", 10 ) );
    snowFlakes.push( new Snow( TYPE_SPARKLING, x, y, "#4C4", 10 ) );
}
