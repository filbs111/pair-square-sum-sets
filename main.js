var MAX_NUM = 500;
var MIN_NUM_TO_PRINT = 12;


function init(){

    var squares=[];
    var infoForSquares=[];
    var anglesForSquares=[];
    for (var xx=0;xx<MAX_NUM;xx++){
        var squarenum = xx*xx;
        squares.push(squarenum);
        infoForSquares.push([]);
        anglesForSquares.push([]);
    }

    //note: probalem trying to solve, of finding sets of coords the same distance from origin,
    //might not be properly solved by pythagorean triples - what about where radius is not an integer?

    //go through x,y . 
    for (var xx=1;xx<MAX_NUM-1;xx++){
        var xsq = xx*xx;
        for (var yy=1;yy<xx;yy++){
            var squared = xsq + yy*yy;
            var idx = squares.indexOf(squared);
            if (idx!=-1){
                infoForSquares[idx].push([xx,yy].join(","));
                anglesForSquares[idx].push(Math.atan2(yy,xx)*180/Math.PI);
            }
        }
    }
    for (var ii=0;ii<squares.length;ii++){
        if (infoForSquares[ii].length>1){
            console.log(ii, squares[ii], infoForSquares[ii], anglesForSquares[ii]);
            for (var aa=1;aa<anglesForSquares[ii].length;aa++){
                console.log(anglesForSquares[ii][aa]-anglesForSquares[ii][aa-1]);
            }
            console.log(90-2*anglesForSquares[ii][0]);
        }
    }

}


function doSomething2(){
    //see if can find pairs of integers that meet the criterion x*x + y*y = z*z + w*w
    //but without = r*r (ie will x,y,z,w!=0)

    var squares=[];
    var countForNum=[];
    var infoForNum=[];

    var startTime = Date.now();

    for (var xx=0;xx<MAX_NUM;xx++){
        var squarenum = xx*xx;
        squares.push(squarenum);
    }

    for (var xx=0;xx<2*MAX_NUM*MAX_NUM;xx++){
        countForNum.push(0);
        infoForNum.push([]);
    }

    //go through all x,y up to MAX_NUM
    for (var xx=1;xx<MAX_NUM;xx++){
        // for (var yy=0;yy<xx;yy++){  //including 0 so will catch pythagorean triples too
        for (var yy=1;yy<=xx;yy++){ //include xx=yy. unsure if possible
            var squarenum = xx*xx+yy*yy;
            // if (squares.indexOf(squarenum)==-1){
                //not enough! should exclude multiples of squares...

                countForNum[squarenum]++;
                infoForNum[squarenum].push([xx,yy].join(","));
                // infoForNum[squarenum].push("...");
            // }
        }
    }

    // for (ii=0;ii<MAX_NUM*MAX_NUM;ii++){
        for (ii=0;ii<MAX_NUM;ii++){  //not all results.

        if (countForNum[ii]>1){
            console.log(ii, countForNum[ii], infoForNum[ii] );
        }

        //find any with matching a,b 1st in array
        console.log("specials");
        for (ii=0;ii<MAX_NUM*MAX_NUM;ii++){  //not all results.

            if (countForNum[ii]>=MIN_NUM_TO_PRINT){
                var first = infoForNum[ii][0].split(",");
                // if (first[0] == first[1]){   //limit to those containing a perfect square
                    console.log(ii, countForNum[ii], infoForNum[ii] );
                // }
            }
        }

    }

    console.log("time taken : " + (Date.now() - startTime));

}


function backportedFromC(){
    //write similarly to c version, avoiding things like array indexof
    //and using linked lists

    var startTime = Date.now();

    var countForNum = new Array(2*MAX_NUM*MAX_NUM);
    var firstIndexForNum = new Array(2*MAX_NUM*MAX_NUM);
    var nextIndex = new Array(MAX_NUM*MAX_NUM);

    for (var xx=0;xx<2*MAX_NUM*MAX_NUM;xx++){ 
        countForNum[xx]=0;
        // firstIndexForNum[xx]=-1; //can leave undefined
    }
    for (var xx=0;xx<MAX_NUM*MAX_NUM;xx++){ 
        nextIndex[xx]=-1;   //might leave undefined
    }

    for (var xx=1;xx<MAX_NUM;xx++){    
        var xsq = xx*xx;
        for (var yy=1;yy<=xx;yy++){
            var squared = xsq + yy*yy;
            
            countForNum[squared]++;
            var index = xx*MAX_NUM + yy;
            nextIndex[index] = firstIndexForNum[squared];
            firstIndexForNum[squared] = index;
        }
    }

    var numberPrinted = 0;
    //note that beyond MAX_NUM*MAX_NUM, might not have full count
    //since only considered x,y up to MAX_NUM
    // for (int xx=0;xx<2*MAX_NUM*MAX_NUM;xx++){
    for (var xx=0;xx<MAX_NUM*MAX_NUM;xx++){
        var thecount = countForNum[xx];
        if (thecount>=MIN_NUM_TO_PRINT){
            // printf("number: %i (%i) : ", xx, thecount );
            console.log("number: "+ xx + "("+ thecount +") : " );
            var currentIndex = firstIndexForNum[xx];
            for (var aa=0;aa<thecount;aa++){
                var numberOne = currentIndex % MAX_NUM;
                var numberTwo = (currentIndex-numberOne)/MAX_NUM;
                //console.log("\t(%i,%i), ", numberOne, numberTwo);
                console.log("\t("+numberOne+","+ numberTwo+"), ");

                currentIndex = nextIndex[currentIndex];
            }
            // printf("\n");
            numberPrinted++;
        }
    }
    // printf("number printed: %i\n", numberPrinted);
    console.log("number printed: " + numberPrinted);

    console.log("time taken : " + (Date.now() - startTime));

}


function backportedFromCTypedArray(){
    //write similarly to c version, avoiding things like array indexof
    //and using linked lists

    var startTime = Date.now();

    var countForNum = new Uint32Array(2*MAX_NUM*MAX_NUM);
    var firstIndexForNum = new Uint32Array(2*MAX_NUM*MAX_NUM);
    var nextIndex = new Uint32Array(MAX_NUM*MAX_NUM);

    for (var xx=1;xx<MAX_NUM;xx++){    
        var xsq = xx*xx;
        for (var yy=1;yy<=xx;yy++){
            var squared = xsq + yy*yy;
            
            countForNum[squared]++;
            var index = xx*MAX_NUM + yy;
            nextIndex[index] = firstIndexForNum[squared];
            firstIndexForNum[squared] = index;
        }
    }

    var numberPrinted = 0;
    //note that beyond MAX_NUM*MAX_NUM, might not have full count
    //since only considered x,y up to MAX_NUM
    // for (int xx=0;xx<2*MAX_NUM*MAX_NUM;xx++){
    for (var xx=0;xx<MAX_NUM*MAX_NUM;xx++){
        var thecount = countForNum[xx];
        if (thecount>=MIN_NUM_TO_PRINT){
            // printf("number: %i (%i) : ", xx, thecount );
            console.log("number: "+ xx + "("+ thecount +") : " );
            var currentIndex = firstIndexForNum[xx];
            for (var aa=0;aa<thecount;aa++){
                var numberOne = currentIndex % MAX_NUM;
                var numberTwo = (currentIndex-numberOne)/MAX_NUM;
                //console.log("\t(%i,%i), ", numberOne, numberTwo);
                console.log("\t("+numberOne+","+ numberTwo+"), ");

                currentIndex = nextIndex[currentIndex];
            }
            // printf("\n");
            numberPrinted++;
        }
    }
    // printf("number printed: %i\n", numberPrinted);
    console.log("number printed: " + numberPrinted);

    console.log("time taken : " + (Date.now() - startTime));

}