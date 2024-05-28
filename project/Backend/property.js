

const Property = require('./propertyController');
exports.createProperty = async (req, res) => {
  try {
    const property = new Property({ ...req.body, owner: req.user._id });
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ available: true });
    res.send(properties);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getSellerProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.send(properties);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!property) {
      return res.status(404).send({ error: 'Property not found' });
    }
    res.send(property);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!property) {
      return res.status(404).send({ error: 'Property not found' });
    }
    res.send({ message: 'Property deleted' });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.markInterest = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner');
    if (!property) {
      return res.status(404).send({ error: 'Property not found' });
    }
    res.send({
      ownerDetails: {
        firstName: property.owner.firstName,
        lastName: property.owner.lastName,
        email: property.owner.email,
        phoneNumber: property.owner.phoneNumber,
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

