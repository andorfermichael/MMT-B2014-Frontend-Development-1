module.exports = function changeName(obj, name) {
     var user = {}

    user.getName = function ()
    {
        return name
    }

    return user
}
