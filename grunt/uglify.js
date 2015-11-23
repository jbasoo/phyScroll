module.exports = {
    default: {
        files: [
            {
                expand: true,
                cwd: 'src',
                src: '*.js',
                dest: 'dist',
                ext: '.min.js'
            }
        ]
    }
};
