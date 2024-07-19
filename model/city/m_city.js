const { City } = require('./city.schema');
const { createJson, NO_DATA_FOUND } = require('../../constants/response');
const { ERROR_CATCH, SUCCESS } = require('../../constants/status_codes');

const createCity = async data => {
    try {
        const result = await City.create(data);
        let response = await result.save();
        response = response.toJSON();
        const obj = {
            id: response.id,
            type: response.City_type,
        };
        return createJson(SUCCESS, obj);
    } catch (err) {
        return createJson(ERROR_CATCH, err);
    }
};

const isCityExist = async whereClause => {
    try {
        const result = await City.findOne({ where: whereClause });
        if (result) {
            return true;
        }
        return false;
    } catch (err) {
        return createJson(ERROR_CATCH, err);
    }
};

const select = async (columns, whereClause) => {
    try {
        const result = await City.findOne({
            attributes: columns,
            where: whereClause,
        });

        if (result != null) {
            const data = result.toJSON();
            if (Object.keys(data).length > 0) {
                return data;
            }
            return false;
        }
        return false;
    } catch (err) {
        return createJson(ERROR_CATCH, err);
    }
};

const countRecords = async (where, include) => {
    try {
        const result = await City.count({ where, include });
        if (result) return result;

        return false;
    } catch (err) {
        return createJson(ERROR_CATCH, err);
    }
};

const selectAll = async (columns, whereClause, offset, limit) => {
    try {
        const result = await City.findAll({
            attributes: columns,
            where: whereClause,
            offset,
            limit,
        });
        const resultArr = JSON.parse(JSON.stringify(result, null, 2));
        if (resultArr.length > 0) {
            return resultArr;
        }
        return false;
    } catch (err) {
        return createJson(ERROR_CATCH, err);
    }
};

const updateCity = async (data, whereClause) => {
    try {
        return await City.update(data, {
            where: whereClause,
        }).then(async () => {
            const isData = await select(['id', 'broker_id'], whereClause);
            if (!isData) {
                return NO_DATA_FOUND;
            }
            return createJson(SUCCESS, isData);
        });
    } catch (err) {
        return createJson(ERROR_CATCH, err);
    }
};

module.exports = {
    createCity,
    countRecords,
    isCityExist,
    updateCity,
    select,
    selectAll
};
