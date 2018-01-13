import * as express from 'express';
import { Numbers } from './Numbers';
let app = express();
app.set('port', (process.env.PORT || 5000));
app.get("/", function (req, res) {
    let number = 2;
    res.send(Number(number));
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});