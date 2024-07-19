const statusCode = require('../constants/status_codes');

const respCodes = {
    failed: 'failed',
    success: 'success',
};
const resMessage = {
    NO_DATA_FOUND: 'No data found',
};

const customMsgs = {
    NO_DATA_FOUND: {
        code: 'success',
        message: resMessage.NO_DATA_FOUND,
        data: [],
    },
};

module.exports = {
    createJson: (status, message, count) => {
        const response = {};
        if (status === 200) {
            response.code = 'success';
            response.data = message;
            response.count = count;
        } else {
            response.code = 'failed';
            response.message = message;
        }

        return response;
    },

    NO_DATA_FOUND: customMsgs.NO_DATA_FOUND,
};
