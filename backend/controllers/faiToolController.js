import FAi from "../models/FaiTool.js";

const createFAi = async (req, res) => {
  try {
    const { title, link, category, pricing } = req.body;
    const image = req.file ? req.file.path : null;

    const newFAi = new FAi({ title, link, image, category, pricing });
    await newFAi.save();

    return res.status(200).json({
      success: true,
      message: "Brand Animal saved successfully",
      data: newFAi,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getFAi = async (req, res) => {
  try {
    const faiList = await FAi.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "FAi fetched successfully",
      data: faiList,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default { createFAi, getFAi };
