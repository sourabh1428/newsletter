const express= require("express")
const app=express();
const bodyParser=require("body-parser")
const request=require("request");
const https=require("https");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})

app.post("/",function(req,res){





    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                   FNAME:firstname,
                   LNAME:lastname
                              }

            }
                ]
            };

            const jsonData=JSON.stringify(data);

            const url="https://us9.api.mailchimp.com/3.0/lists/6d424762ba";
            
            const options={
                method:"POST",
                auth:"sourabh:2612ba09a4e76b9dccff5e38071a0a3c-us9"
            }
            
            
            const request=https.request(url,options,function(response){

               if(response.statusCode===200) {
                res.sendFile(__dirname+"/success.html")
               }
               else{ res.sendFile(__dirname+"/failure.html")
                        }

                response.on("data",function(data) {
                    console.log(JSON.parse(data));                    
                })
            })
            request.write(jsonData);
            request.end();


});


app.post("/failure",function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000,function(){
console.log("hello duniya")
})



//api key = b5026bc00a261b8272e2d7c232fe3e4f-us9
//api key = b5026bc00a261b8272e2d7c232fe3e4f-us9
//list id=6d424762ba
