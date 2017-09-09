//process file for pm2 instancing testing
module.exports = {
    apps: [{
        name:       "testbot",
        script:     "./testbot.js",
        instances:  3,
        exec_mode:  "cluster",
        instance_var: "INSTID"
    }]
}