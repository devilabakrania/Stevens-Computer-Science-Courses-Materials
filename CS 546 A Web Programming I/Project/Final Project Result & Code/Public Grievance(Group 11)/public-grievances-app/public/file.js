const fs = require('fs');
const issues = require('../data/issues');

let exportedMethods = {
    async downloadFile() {
        let issueList = await issues.getAllIssues();
        let summary = JSON.stringify(issueList, null, 2);
        fs.writeFile('summary.txt', summary, (e) => {
            if (e) throw e;
        });
    }
};

module.exports = exportedMethods;
