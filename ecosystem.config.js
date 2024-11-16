module.exports = {
    apps: [
        {
            name: 'client',
            script: 'npm',
            args: 'start --prefix client',
        },
        {
            name: 'server',
            script: 'npm',
            args: 'start --prefix server',
        },
    ],
};
