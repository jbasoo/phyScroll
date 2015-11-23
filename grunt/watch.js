module.exports = function(grunt, data) {
    return {
        options: {
            spawn: false,
            livereload: true
        },
        build: {
            files: [
                'src/*.js'
            ],
            tasks: [
                'jshint',
                'uglify'
            ]
        }
    };
};
