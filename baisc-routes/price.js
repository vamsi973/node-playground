module.exports = (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
        "success": true,
        "message": 'prices page requested'
    }))
}