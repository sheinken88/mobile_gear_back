const { Op } = require("sequelize");
const { Brands, Categories } = require("../models");

const getConditions = (query) => {
  const { modelName, categoryName, min, max, brandName } = query;
  let conditions = {
    where: {},
    include: [
      { model: Brands, where: {} },
      { model: Categories, where: {} },
    ],
  };

  if (modelName) {
    conditions.where.modelName = { [Op.iLike]: `%${modelName}%` };
  }

  if (brandName) {
    conditions.include[0].where = {
      brandName: { [Op.iLike]: `%${brandName}%` },
    };
  }

  if (categoryName) {
    conditions.include[1].where = {
      categoryName: { [Op.iLike]: `%${categoryName}%` },
    };
  }

  if (min || max) {
    if (min && max) {
      conditions.where.price = { [Op.between]: [Number(min), Number(max)] };
    } else {
      if (min) {
        conditions.where.price = { [Op.gte]: Number(min) };
      } else {
        conditions.where.price = { [Op.lte]: Number(max) };
      }
    }
  }
  return conditions;
};
module.exports = { getConditions };
