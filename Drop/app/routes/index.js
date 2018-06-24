var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

router.get('/file', (req, res) => {
    let path = './' + req.query.path;
    console.log(path);
    if(fs.existsSync(path)) {
        fs.readFile(path, (err, data) => {
            if(err) {
                console.log(err);
                res.status(404).json({
                    error: err
                })
            }else{
                res.status(200).end(data)
            }
        })
    }else{
        res.status(404).json({
            error: 'File not found'
        })
    }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/file', (req, res) => {
    let form = new formidable.IncomingForm({
        uploadDir: './upload',
        keepExtensions: true
    });
    form.parse(req, (err, fields, files) => {
        let path = "./" + fields.path;

        if(fs.existsSync(path)){
            fs.unlink(path, err => {
                res.status(400).json({err});
            })
        }else {
            res.json({
                fields
            });
        }
    });
});

router.post('/upload', function(req, res) {
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
      res.json({
          files
      });
  });

});

module.exports = router;
