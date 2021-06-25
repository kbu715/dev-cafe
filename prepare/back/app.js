const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, 111);

    if(req.method === 'GET') {
        if(req.url === '/api/posts') {

        }
    } else if(req.method === 'POST') {
        if(req.url === '/api/post') {

        }
    } else if(req.method === 'DELETE') {
        if(req.url === '/api/post') {
            
        }
    }

    res.write('<h1>111</h1>');
    res.write('<h2>222</h2>');
    res.write('<h3>333</h3>');
    res.write('<h4>444</h4>');
    res.end('Hello node.');
});

server.listen(3065, () => console.log(`🌈 Server is running`));

// favicon.ico  ⬅ 브라우저가 직접 요청

// http 보다 코드를 깔끔하고 구조적으로 짤 수 있는 express framework를 사용한다.

// res.end 두번 사용하면 안된다.

// 서버의 기본적인 원리는 요청을 보내면 응답을 해준다. (1:1)