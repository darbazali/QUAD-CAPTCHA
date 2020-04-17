
const toExport = {
    hello: function (name) {
        return console.log("hello ", ...name);
    }
}

export default toExport;