const { json } = require("express");
const express = require("express");
const fs = require("fs");
const app = express();

const fetchh = require("node-fetch");

app.get("/", async (req, res) => {
  const str = fs.readFileSync("allhosts.txt")
  const testst = str.toString().replaceAll("https://", "");
  const testtt = testst.replaceAll("http://", "");
  const testttt = testtt.replaceAll("www.", "").replaceAll('"', '').replaceAll('*.','').replaceAll(';','').replaceAll('\n' , '')
  const arr = testttt.split(" ");
  const SetA = new Set(arr);
  const lastArray = [...SetA].filter(x=>{
    return x.includes('.')
  });
  // res.json(lastArray)
  nuum = 1;
 res.json(lastArray)
  const teeee = async () => {
   await  lastArray.forEach((element) => {
            fs.readFile("testhost.txt", "utf-8", function (err, file) {
        if (err) console.log(err);
        if (file.includes(element)) {
          // console.log("not new")
           console.log('http://'+element + 'not new')
        } else {
          const test = async () => {
            await fetchh('https://' + element)
              .then((ress) => {
                console.log(ress.headers.get('server'))
                return ress;
              })
              .then((rest) =>{
                console.log(
                `${nuum} - ${rest.url} - ${rest.headers.get('server')} - gooooooooooooooooooood`
                  )
                  fs.appendFile(
                   "vaildhost3.txt",
                   ` ${nuum} - ${rest.url} - ${rest.headers.get('server')} \n`
                    ,
                    function (err) {
                      if (err) {
                        console.log(err);
                      }
        
        
                    }
                  );
                  fs.appendFile(
                    "testhost.txt",
                    `${element} \n`,
                    function (err) {
                      if (err) {
                        console.log(err);
                      }
                  
                    } );
                    nuum ++
                  
        
              }
              )
              .catch((err) => {
                fs.appendFile(
                  "testhost.txt",
                  `${element} \n`,
                  function (err) {
                    if (err) {
                      console.log(err);
                    }
                
                  } );
                console.log(`${nuum} - ${element} - bad `);
                nuum ++

              })
          };
        test()
      
        }
      });


     
    })

    req.satus

  };
  await teeee()


});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
