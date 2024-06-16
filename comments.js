// Create web server
// Create a web server that will respond to a request with a web page containing a form. The form will have a single text field that will accept a comment. When the form is submitted, the comment will be saved to a file named comments.txt. Each comment should be on its own line in the file.

const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', data => {
      body += data.toString();
    });
    req.on('end', () => {
      fs.appendFile('comments.txt', body + '\n', err => {
        if (err) throw err;
        console.log('Comment saved');
        res.end('Comment saved');
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('index.html').pipe(res);
  }
}).listen(8080);

// index.html
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Comments</title>
  </head>
  <body>
    <h1>Comments</h1>
    <form method="POST" action="/">
      <textarea name="comment"></textarea><br>
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
`;

fs.writeFile('index.html', html, err => {
  if (err) throw err;
  console.log('File created');
});

// comments.txt
// Comments will be saved here

// Run the server
// Run the server by executing the following command in the terminal:
// node comments.js
// Open a web browser and navigate to http://localhost:8080. You should see a form with a text area and a submit button. Enter a comment in the text area and click the submit button. The comment should be saved to the comments.txt file.