module.exports = {
    isUploadSuccess(res) {
        return res.uploadState === 'SUCCESS';
    },

    exitWithUploadFailure(item) {
        const firstError = item.itemError[0];
        console.log(`Error Code: ${firstError.error_code}`);
        console.log(`Details: ${firstError.error_detail}`);
        process.exit(1);
    },

    exitWithPublishStatus(item) {
        const firstStatus = item.status[0];
        // TODO: Look at item stucture and determine where "detail" actually is,
        // since it's clearly not the same as the line right above this
        // const firstStatusDetail = item.status[0];
        console.log(`Publish Status: ${firstStatus}`);
        // console.log(`Details: ${firstStatusDetail}`);
        process.exit(0);
    },

    validateInput(input, { file }) {
        if (!input.length) {
            return { error: 'Must specify "upload" or "publish"' };
        }

        if (input.length > 1) {
            return { error: 'Too many parameters' };
        }

        if (typeof file !== 'string') {
            return { error: '--file parameter required' };
        }

        return { valid: true };
    }
};
