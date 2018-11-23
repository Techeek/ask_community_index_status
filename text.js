
var f1 = function(a123)
{
    var a = 1,
        b = 2,
        c = 3;
    var s = a123(a,b,c);
    return s;
};
var d = f1(function(x,y,z){
    return (x+y+z);
});
console.log(d);