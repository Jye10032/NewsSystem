var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
//console.log(a[6])
a[6](); // 10