import Component from "../models/Component.js";


export const createComponent = async (req, res) => {
  try {
    const { name, category, quantity, manufacturer, status } = req.body;
    const component = await Component.create({
      name,
      category,
      quantity,
      manufacturer,
      status,
      addedBy: req.user.id,
    });

    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getComponents = async (req, res) => {
  try {
    const components = await Component.find().populate("addedBy", "name email");
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComponentById = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id).populate("addedBy", "name email");
    if (!component) return res.status(404).json({ message: "Component not found" });

    res.json(component);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ message: "Component not found" });

    // Admin & Manager can update any component
    if (req.user.role === "admin" || req.user.role === "manager") {
      const updatedComponent = await Component.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updatedComponent);
    }

    // Engineer can only update their own component
    if (req.user.role === "engineer" && component.addedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this component" });
    }

    const updatedComponent = await Component.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedComponent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ message: "Component not found" });

    // Admin can delete any component
    if (req.user.role === "admin") {
      await component.deleteOne();
      return res.status(200).json({ message: "Component deleted successfully" });
    }

    // Engineer can delete only their own components
    if (req.user.role === "engineer" && component.addedBy.toString() === req.user.id) {
      await component.deleteOne();
      return res.status(200).json({ message: "Component deleted successfully" });
    }

    return res.status(403).json({ message: "Not authorized to delete this component" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
