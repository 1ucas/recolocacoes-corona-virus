const fs = require('fs');

module.exports.leituraDados = function (){
    const leDiretorio = function(){
        fs.readdir(process.cwd(), function (err, files) {
            if (err) {
              console.log(err);
              return;
            }
            console.log(files);
        });
    }

}
