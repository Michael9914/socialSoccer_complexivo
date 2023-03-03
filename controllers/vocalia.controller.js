const Vocalia = require("../models/vocalia");

const vocaliaCtrl = {}; 

vocaliaCtrl.getVocalias = async (req, res, next) => {
    const vocalias = await Vocalia.find();
    res.json(vocalias);
}

vocaliaCtrl.createVocalia = async (req, res, next) => {
    const vocalia = new Vocalia({
        team: req.body.team,
        nameOfPlayer: req.body.nameOfPlayer,
        numberOfTShirt: req.body.numberOfTShirt,
        changes: req.body.changes,
        card: req.body.card,
        goals: req.body.goals,
        calendar: req.body.calendar,
        numberOfChanges: req.body.numberOfChanges,


    });
    await vocalia.save();
    res.json({ status: "Vocalia created"});
};

vocaliaCtrl.getVocalia = async (req, res, next) => {
    const { id } = req.params;
    const vocalia = await Vocalia.findById(id);
    res.json(vocalia);
  };
  
  vocaliaCtrl.editVocalia = async (req, res, next) => {
    const { id } = req.params;
    await Vocalia.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({ status: "Vocalia Updated" });
  };
  
  vocaliaCtrl.deleteVocalia = async (req, res, next) => {
    await Vocalia.findByIdAndRemove(req.params.id);
    res.json({ status: "Vocalia Deleted" });
  };
  
  module.exports = vocaliaCtrl;