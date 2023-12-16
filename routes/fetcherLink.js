var express = require("express");
var CandidateTable = require("../model/table")

var router = express.Router()
router.post("/addCandidate",(req,res) => {console.log("API Working",req.body)
var Candidate = new CandidateTable({
    name: req.body.name,
    email:req.body.email 
})
Candidate.save().then(
    (data)=>{
        console.log("Save data" , data)
        return res.status(200).json({saveData : data})
    }
).catch((error)=>{console.log("Error data" , error)
return res.status(400).json({saveData : error})})
})

router.post("/candidates", (req, res) => {
    try {
        const { email, test_name, score } = req.body;
        const candidate = CandidateTable.findOne({ email });
        console.log("candiadte",candidate)
        if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
        }

    const testIndex = candidate.test_scores.findOne(
        (test) => test.test_name === test_name
      );
  
      if (testIndex !== -1) {
        candidate.test_scores[testIndex].score = score;
      } else {
        candidate.test_scores.push({
          test_name,
          score,
        });
      }
      candidate.save();
  
      return res.status(200).json({ message: 'Test score assigned successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});

router.get("/getData/search", (req, res) => {
    CandidateTable
      .find()
      .then((data) => {
        return res.status(200).json({ getData: data });
      })
      .catch((error) => {
        console.log("Error data", error);
        return res.status(400).json({ getData: error });
      });
  });

router.post("/update/:id",(req,res)=> {
    console.log("paramsData",req.params.id)
    CandidateTable.findByIdAndUpdate({_id : req.params.id},{$set:req.body},{new: true}).then((data)=> {
        return res.status(200).json({ putData: "Data Updated succesfully" });
    }).catch((error) => {
        console.log("Error data", error);
        return res.status(400).json({ putData: error });
    })
})
module.exports = router;