var request = require('request');
var fs = require('fs');
var open = require('open');
var url='http://dolphintechnologies.in/manit/accessview.php';
var schno = '141114001';
function attack(){
request.post(
    url,
    { form: { scholar: schno,semester:"2",button:"submit"} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            fs.writeFile('eceresults(1st year)/'+schno+'.html',body,function(err){
              if(err) console.log('failed writing file data');
             });
            
            console.log(schno);
            schno = (parseInt(schno)+1).toString();
            attack();
        }
        else{ 
        	console.log("attacking once again");
        	attack();
        }
    }
);
}

attack();
