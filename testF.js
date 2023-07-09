const { json } = require("express");
const express = require("express");
const fs = require("fs");
const app = express();

const fetchh = require("node-fetch");

app.get("/", async (req, res) => {
  const str = fs.readFileSync("allhosts.txt")
  const testst = str.toString().replaceAll("https://", "");
  const testtt = testst.replaceAll("http://", "");
  const testttt = testtt.replaceAll("www.", "").replaceAll('*.','').replaceAll(';','').replaceAll('\n' , '')
  const arr = testttt.split(" ");
  const SetA = new Set(arr);
  const lastArray = [...SetA].filter(x=>{
    return x.includes('.')
  });
  // res.json(lastArray)
  nuum = 0;
 res.json(lastArray)
  const teeee = async () => {
    await lastArray.forEach((element) => {
      // fs.appendFile(
      //   "allhosts.txt",
      //     element + " \n",
      //   function (err) {
      //     if (err) {
      //       console.log(err);
      //     } })
      elementN = "http://" + element;
      fs.readFile("testhost.txt", "utf-8", function (err, file) {
        if (err) console.log(err);
        if (file.includes(element)) {
          // console.log("not new")
          //  console.log('http://'+element)
        } else {
          fs.appendFile(
            "testhost.txt",
             element + " \n",
            function (err) {
              if (err) {
                console.log(err);
              }

              const test = async () => {
                await fetchh('https://' + element)
                  .then((ress) => {
                    console.log(ress.headers)
                    return ress;
                  })
                  .then((rest) =>{
                    console.log(
                      "-------",
                      rest.url + ' '  + 
                      rest + '  ' + '('+ nuum++ +')'

                      )
                      fs.appendFile(
                        Date.now()+"vaildhost.txt",
                        "http://" + element + ' \n'
                        ,
                        function (err) {
                          if (err) {
                            console.log(err);
                          }
            
            
                        }
                      );
                      
            
                  }
                  )
                  .catch((err) => {
                    console.log("https://" + element +  '('+ nuum++ +')'   + " bad");
                  })
              };
               test()

          
            } );
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
