let geometry = require("./geometry")
let utilities = require("./utilities") 
try{

try{
    const ans=geometry.volumeOfRectangularPrism(2,3,4)
        console.log(ans)
}
catch(error)
{
    console.error("failed!")
}

try{
    const ans =geometry.volumeOfRectangularPrism(1,0,4)
        console.log(ans);
}
catch(error)
{
    console.error("failed!")
}

try{
    const ans =geometry.volumeOfRectangularPrism(a,1,4)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
}

try{
    const ans =geometry.volumeOfRectangularPrism(7,-8,9)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
} 

try{
    const ans =geometry.surfaceAreaOfRectangularPrism(2,3,4)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
}

try{
    const ans =geometry.surfaceAreaOfRectangularPrism(a,1,4)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
}

try{
    const ans =geometry.surfaceAreaOfRectangularPrism(7,-8,9)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
} 

try{
    const ans =geometry.volumeOfSphere(7)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
} 
try{
    const ans =geometry.volumeOfSphere(0)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
} 
try{
    const ans =geometry.volumeOfSphere(-9)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
} 
try{
    const ans =geometry.volumeOfSphere(y)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
}
try{
    const ans =geometry.surfaceAreaOfSphere(7)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
} 
try{
    const ans =geometry.surfaceAreaOfSphere(0)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
} 
try{
    const ans =geometry.surfaceAreaOfSphere(-9)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
} 
try{
    const ans =geometry.surfaceAreaOfSphere(y)
    console.log(ans);
}
catch(error)
{
    console.error("failed!")
} 

try{
    const first = {a:2,b:3};
    const second = {a:2,b:4};
    const third = {a:2, b:3};
    console.log(deepEquality(first,second));
    console.log(deepEquality(first,third));
}
catch(error)
{
    console.error("failed!")
}

try{
    const testArr = ["a","a","b","a","b","c"];
    console.log(uniqueElements(testArr));
}
catch(error)
{
    console.error("failed!")
}

try{
    const test = "Hello, the pie is in the oven";
    const charMap = countOfEachCharacterInString(test);
}
catch(error)
{
    console.error("failed!")
}

}
catch(e){
    console.error(e)
}