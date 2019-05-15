String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};


function iconError(icon, name) {
    icon.onerror = "";
    icon.src = '../../src/icons/{0}/icon-{0}-normal.svg'.format(name);
    return true;
}