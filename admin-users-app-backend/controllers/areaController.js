const Area = require("../models/Area");

exports.createArea = async (req, res) => {
  try {
    const area = await Area.create(req.body);
    res.status(201).json(area);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAreas = async (req, res) => {
  try {
    const areas = await Area.findAll();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateArea = async (req, res) => {
  try {
    const area = await Area.findByPk(req.params.id);
    if (!area) {
      return res.status(404).json({ error: "Area no encontrado" });
    }
    await area.update(req.body);
    res.status(200).json(area);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteArea = async (req, res) => {
  try {
    const area = await Area.destroy({ where: { id: req.params.id } });
    if (!area) {
      return res.status(404).json({ error: "Area no encontrado" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
