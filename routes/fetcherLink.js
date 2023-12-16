var express = require("express");
var CandidateTable = require("../model/candidate");
var scoreTable = require("../model/score");

var router = express.Router();

router.post("/addCandidate", (req, res) => {
  console.log("API Working", req.body);
  var Candidate = new CandidateTable({
    name: req.body.name,
    email: req.body.email,
    id: req.body.id,
  });
  Candidate.save()
    .then((data) => {
      console.log("Save data", data);
      return res.status(200).json({ saveData: data });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ saveData: error });
    });
});

router.post("/addScore", (req, res) => {
  var Score = new scoreTable({
    id: req.body.id,
    score: req.body.score,
    round: req.body.round,
  });
  Score.save()
    .then((data) => {
      console.log("Save data", data);
      return res.status(200).json({ saveData: data });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ saveData: error });
    });
});

router.get("/getHighestScorer", async (req, res) => {
    try {

      const highestScorer = await scoreTable.findOne({})
        .sort({ score: -1 })
        .populate('id', 'name email')
        .exec();
  
      if (!highestScorer) {
        return res.status(404).json({ message: "No candidates found" });
      }
  
      return res.status(200).json({ highestScorer });
    } catch (error) {
      console.error("Error fetching highest scorer:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  router.get("/getAverageScores", async (req, res) => {
    try {
      const averageScores = await scoreTable.aggregate([
        {
          $group: {
            _id: "$round",
            averageScore: { $avg: "$score" },
          },
        },
      ]);
  
      if (!averageScores || averageScores.length === 0) {
        return res.status(404).json({ message: "No scores found" });
      }
  
      return res.status(200).json({ averageScores });
    } catch (error) {
      console.error("Error fetching average scores:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
