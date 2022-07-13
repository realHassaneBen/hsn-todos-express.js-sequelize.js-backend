import { Resource } from "../models/index.js";

const findAllResourcesQuery = async (include = []) => {
    const resources = await Resource.findAll({ include: [...include] });
    return resources;
};

const findByPkResourceQuery = (id) => {
    const resource = Resource.findByPk(id);
    return resource;
};
const findOneResourceQuery = (id) => {
    const resource = Resource.findOne({ where: id });
    return resource;
};

const createResourceQuery = async (resource) => {
    const { title, description, price, UserId, ResourceId, CategoryId } =
        resource;

    const createdResource = await Resource.create({
        title,
        description,
        price,
        UserId,
        ResourceId,
        CategoryId,
    });
    await createdResource.setUser(UserId);
    await createdResource.setResource(ResourceId);
    return createdResource;
};

const updateResourceQuery = async (id, resource) => {
    await Resource.update(resource, { where: { ...id } });
};

const deleteResourceQuery = async (id) => {
    await Resource.destroy({
        where: id,
    });
};

export {
    findAllResourcesQuery,
    findByPkResourceQuery,
    findOneResourceQuery,
    createResourceQuery,
    updateResourceQuery,
    deleteResourceQuery,
};
