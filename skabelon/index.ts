import * as Express from "express";

let app = Express();
app.set('port', (process.env.PORT || 3000));


app.get("/", (req, resp) =>
{
resp.sendFile( __dirname + "/index.html")
});

app.listen(app.get('port'));