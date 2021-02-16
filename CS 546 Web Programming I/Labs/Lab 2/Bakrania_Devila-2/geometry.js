function volumeOfRectangularPrism(length, width, height){
    if(isNaN(length))
    throw "It is not a number"
    else if(length<=0)
    throw "length cannot be less than or equal to 0"


    if(isNaN(width))
    throw "It is not a number"
    else if(width<=0)
    throw "width cannot be less than or equal to 0"

    if(isNaN(height))
    throw "It is not a number"
    else if(height<=0)
    throw "height cannot be less than or equal to 0"

    return length*width*height
}

function surfaceAreaOfRectangularPrism(length, width, height){
    if(isNaN(length))
    throw "It is not a number"
    else if(length<=0)
    throw "length cannot be less than or equal to 0"

    if(isNaN(width))
    throw "It is not a number"
    else if(width<=0)
    throw "width cannot be less than or equal to 0"

    if(isNaN(height))
    throw "It is not a number"
    else if(height<=0)
    throw "height cannot be less than or equal to 0"

    return (2*((length*width)+(width*height)+(height*length)))
}
 
function volumeOfSphere(radius){
    if(isNaN(radius))
    throw "It is not a number"
    else if(radius<=0)
    throw "radius cannot be less than or equal to 0"
    return ((4/3)*(Math.PI)*(radius*radius*radius))
}

function surfaceAreaOfSphere(radius){
    if(isNaN(radius))
    throw "It is not a number"
    else if(radius<=0)
    throw "radius cannot be less than or equal to 0"
    return(4 * (Math.PI)*(radius*radius))
}

module.exports = {
    volumeOfRectangularPrism,
    surfaceAreaOfRectangularPrism,
    volumeOfSphere,
    surfaceAreaOfSphere
};

