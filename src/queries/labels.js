import { Op } from "sequelize";
import { Label } from "../scopes/index.js";

const findAllLabelsQuery = async () => {
    const labels = await Label.scope("withAssociations").findAll();
    return labels;
};
const findAllLabelsBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.like]: `%${q}%` } }));

    const label = await Label.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    });
    return label;
};
const findByPkLabelQuery = async (id) => {
    const label = await Label.scope("withAssociations").findByPk(id);
    return label;
};
const findOneLabelQuery = async (where) => {
    const label = await Label.scope("withAssociations").findOne({ where });
    return label;
};

const createLabelQuery = async (labelData) => {
    const createdLabel = await Label.create(labelData);
    return createdLabel;
};

const updateLabelQuery = async (labelData, where) => {
    await Label.update(labelData, { where });
    const updatedLabel = await Label.scope("withAssociations").findOne({
        where,
    });
    updatedLabel.categories.map(
        async (c) => await updatedLabel.removeCategory(c.id)
    );
    labelData.CategoriesIds.map(
        async (ci) => await updatedLabel.addCategory(ci)
    );
    return updatedLabel;
};

const deleteLabelQuery = async (where) => {
    const deletedLabel = await Label.destroy({
        where,
    });
    return deletedLabel;
};

export {
    findAllLabelsQuery,
    findAllLabelsBySearchQuery,
    findByPkLabelQuery,
    findOneLabelQuery,
    createLabelQuery,
    updateLabelQuery,
    deleteLabelQuery,
};
