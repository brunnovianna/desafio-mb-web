const express = require('express')
const { createServer: createViteServer } = require('vite')
const fs = require('fs')
const path = require('path')

async function start() {
  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: 'html' },
    appType: 'custom'
  })
  app.use(vite.middlewares)
  app.use(express.json())

  app.post('/registration', (req, res) => {
    const data = req.body;
    const missingFields = [];
  
    if (!data.email) missingFields.push('email');
    if (!data.registrationType) missingFields.push('registrationType');
    if (!data.password) missingFields.push('password');
  
    if (data.registrationType === 'PF') {
      ['name', 'cpf', 'birthDate', 'phone'].forEach(field => {
        if (!data[field]) missingFields.push(field);
      });
    } else if (data.registrationType === 'PJ') {
      ['companyName', 'cnpj', 'startDate', 'companyPhone'].forEach(field => {
        if (!data[field]) missingFields.push(field);
      });
    } else {
      missingFields.push('registrationType');
    }
  
    if (missingFields.length > 0) {
      return res.status(400).json({ success: false, missingFields });
    }

    res.json({ success: true, message: 'Dados recebidos com sucesso.' });  })

  app.use('*', async (req, res) => {
    let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    template = await vite.transformIndexHtml(req.url, template)
    res.setHeader('Content-Type', 'text/html')
    res.end(template)
  })

  app.listen(3000, () => console.log('rodando em http://localhost:3000'))
}

start()