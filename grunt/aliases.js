module.exports = function(grunt, data) {
    return {
        default: {
            description: 'Default build',
            tasks: [
                'jshint',
                'uglify'
            ]
        }
    };
};
