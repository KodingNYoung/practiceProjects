// create a constructor for the HTTP object
function HTTPObject(){
    this.http = new XMLHttpRequest();
}

// get request
HTTPObject.prototype.get = function(url, cb){
    // this takes in a callback function that will perform the task on the data asynchronously. 
    this.http.open("GET", url, true);

    const self = this;
    this.http.onload = function(){
        if (self.http.status === 200){
            cb(null, self.http.responseText);
        }else{
            cb(`Error: ${self.http.status}`)
        }
    }

    this.http.send();
}
// post request
HTTPObject.prototype.post = function(url, data, cb){
    this.http.open("POST", url, true);

    // to set the content type
    this.http.setRequestHeader("Content-type", "application/json");

    const self = this;
    this.http.onload = function(){
        cb(null, self.http.responseText);
    }


    this.http.send(JSON.stringify(data));
}

// update request

// delete request
