var express = require('express');
var app = express();
var cors = require('cors');
var multer = require('multer');
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json()); 

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
       
        cb(null,file.originalname)
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');


app.post('/upload', function(req, res){
    upload(req,res,function(err){
        console.log(req.file);
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
    
});
app.listen(3000, () => console.log('App API works on port 3000!'))