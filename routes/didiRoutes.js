// module.exports()= function didiRoutes(didi){

//     async function defaultPG(req, res) {
//       res.render("index");
//     }
  
//     async function homePage (req, res) {
//       try {
//         res.render("invoices", {
//           requestTimes: await didi.poolTable(),
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     async function About(req, res){
//         try{
//             res.render("about")
//         }catch (error){
//             console.log(error)
//         }
//     }

//     async function Contact(req, res){
//         try{
//             res.render("contact")
//         }catch(error){
//             console.log(error)
//         }
//     }
  
//     async function errorMessages(req, res, next) {
//       try {
//         let outstanding = req.body.outstanding;
//         let names = req.body.textBoxBttn;
    
//         if (outstanding == undefined && names == "") {
//           req.flash("info", "Please enter the name and select type of invoice!");
//           res.render("invoices", {
//             count: await didi.poolTable(),
//           });
//         } else if (outstanding == undefined) {
//           req.flash("info", "Please select a language!");
//           res.render("invoices", {
//             count: await didi.poolTable(),
//           });
//         } else if (names == "") {
//           req.flash("info", "Please enter a valid name!");
//           res.render("invoices", {
//             count: await didi.poolTable(),
//           });
//         } else {
//           didi.Message(outstanding, names);
//           await didi.setNames(names);
//           res.render("invoices", {
//             pull: didi.getPull(),
//             count: await pull.poolTable(),
//           });
          
//         }
//       } catch (error) {
//         next(error);
//       }
//     }
  
//     async function nameList(req, res) {
//       var namesList = await didi.getNames();
//       res.render("requests", { namesList });
//     }
  
//     async function gettingNames(req, res) {
//       try {
//         var nameList = await didi.getNames();
//         // console.log(nameList)
//         res.render("requests", {
//           namesList: nameList,
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }
  
//     async function userName(req, res) {
//       var name = req.params.username;
//       let rqstNames = await didi.getUserName(name);
//       console.log(rqstNames);
//       res.render("veiws", {
//         username: name,
//         requestTimes: rqstNames,
//       });
//     }
  
//     function backRoute(req, res) {
//       res.redirect("/");
//     }
  
//     return{
//       defaultPG,
//       homePage,
//       errorMessages,
//       nameList,
//       gettingNames,
//       userName,
//       backRoute,
//       About,
//       Contact
//     }
//   }