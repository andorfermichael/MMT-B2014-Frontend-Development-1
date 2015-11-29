module.exports = function setGenerator(set, counter, type) {
    for (var i = 0; i < counter; i++) 
    {

    	if (type === 'int')
    	{
        	set.add(i)
        }
        else if (type === 'string')
        {
        	set.add(i.toString())
        }
    };
}
