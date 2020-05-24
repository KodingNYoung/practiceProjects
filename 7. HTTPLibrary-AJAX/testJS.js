// instantiate an object of the HTTP constructor
const xhr = new HTTPObject();


// get request
xhr.get('https://jsonplaceholder.typicode.com/posts/1',function(err, post){
    if(err){
        console.log(err)
    }else{
        console.log(ost)
    }
});

