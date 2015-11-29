module.exports = function fixture() {
    var dog1 = {
        name: "Don",
        weight: 15,
        breed: "Bulldog",
        sound: "Wroof"
    }
    var dog2 = {
        name: "Strizi",
        weight: 5,
        breed: "Dachshund",
        sound: "Irf"
    }

    return [dog1, dog2]
}
