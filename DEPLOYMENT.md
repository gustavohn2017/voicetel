# Guia de Implantação do 4studio

Este documento fornece instruções detalhadas para implantação do sistema 4studio em ambientes de desenvolvimento e produção.

## Implantação em Ambiente de Desenvolvimento

### Pré-requisitos
- Python 3.9+
- Node.js 18+
- Git
- PostgreSQL (opcional, pode usar SQLite)

### Passos para Implantação

1. **Clone o repositório**
   ```
   git clone https://github.com/gustavohn2017/4studio.git
   cd 4studio
   ```

2. **Configuração Automática**
   
   Execute o script de inicialização:
   ```
   .\start_development.ps1
   ```

3. **Configuração Manual**

   #### Backend (Django):
   
   ```
   cd 4studio-backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

   #### Frontend (Next.js):
   
   ```
   cd 4studio-frontend
   npm install
   npm run dev
   ```

## Implantação em Ambiente de Produção

### Backend (Django)

1. **Preparação do Servidor**
   
   - Instale Python 3.9+, PostgreSQL, Nginx e outras dependências:
     ```
     sudo apt update
     sudo apt install python3-pip python3-venv postgresql nginx
     ```

2. **Configuração do Banco de Dados**
   
   - Crie um banco de dados PostgreSQL:
     ```
     sudo -u postgres psql
     CREATE DATABASE 4studio_db;
     CREATE USER 4studio_user WITH PASSWORD 'senha_segura';
     GRANT ALL PRIVILEGES ON DATABASE 4studio_db TO 4studio_user;
     \q
     ```

3. **Implantação do Código**
   
   - Clone o repositório:
     ```
     git clone https://github.com/gustavohn2017/4studio.git
     cd 4studio/4studio-backend
     ```
   
   - Configure o ambiente virtual:
     ```
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     pip install gunicorn
     ```

4. **Configurações de Produção**
   
   - Crie um arquivo `.env` para configurações sensíveis:
     ```
     SECRET_KEY=sua_chave_secreta_gerada
     DEBUG=False
     ALLOWED_HOSTS=seu_dominio.com,www.seu_dominio.com
     DB_NAME=4studio_db
     DB_USER=4studio_user
     DB_PASSWORD=senha_segura
     DB_HOST=localhost
     EMAIL_HOST=smtp.seu_provedor.com
     EMAIL_PORT=587
     EMAIL_HOST_USER=seu_email@provedor.com
     EMAIL_HOST_PASSWORD=sua_senha_de_app
     ```

   - Configure o settings.py para usar variáveis de ambiente

5. **Configuração do Gunicorn**
   
   - Crie um arquivo systemd para o serviço:
     ```
     sudo nano /etc/systemd/system/4studio.service
     ```
   
   - Adicione o seguinte conteúdo:
     ```
     [Unit]
     Description=Gunicorn daemon for 4studio
     After=network.target

     [Service]
     User=www-data
     Group=www-data
     WorkingDirectory=/caminho/para/4studio/4studio-backend
     ExecStart=/caminho/para/4studio/4studio-backend/venv/bin/gunicorn \
               --access-logfile - \
               --workers 3 \
               --bind unix:/caminho/para/4studio/4studio-backend/4studio.sock \
               4studio.wsgi:application

     [Install]
     WantedBy=multi-user.target
     ```

6. **Configuração do Nginx**
   
   - Crie um arquivo de configuração:
     ```
     sudo nano /etc/nginx/sites-available/4studio
     ```
   
   - Adicione o seguinte conteúdo:
     ```
     server {
         listen 80;
         server_name seu_dominio.com www.seu_dominio.com;

         location = /favicon.ico { access_log off; log_not_found off; }
         
         location /static/ {
             root /caminho/para/4studio/4studio-backend;
         }

         location /media/ {
             root /caminho/para/4studio/4studio-backend;
         }

         location / {
             include proxy_params;
             proxy_pass http://unix:/caminho/para/4studio/4studio-backend/4studio.sock;
         }
     }
     ```

   - Habilite o site:
     ```
     sudo ln -s /etc/nginx/sites-available/4studio /etc/nginx/sites-enabled
     sudo nginx -t
     sudo systemctl restart nginx
     ```

7. **Configure o HTTPS com Let's Encrypt**
   ```
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d seu_dominio.com -d www.seu_dominio.com
   ```

8. **Inicie o serviço**
   ```
   sudo systemctl start 4studio
   sudo systemctl enable 4studio
   ```

### Frontend (Next.js)

#### Opção 1: Implantação na Vercel (Recomendado)

1. Crie uma conta na Vercel: https://vercel.com/signup
2. Instale a CLI da Vercel: `npm i -g vercel`
3. Navegue até a pasta do frontend: `cd 4studio-frontend`
4. Execute o comando: `vercel`
5. Siga as instruções para deployment

#### Opção 2: Build Estático

1. Navegue até a pasta do frontend:
   ```
   cd 4studio-frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Construa o aplicativo:
   ```
   npm run build
   ```

4. O resultado estará na pasta `.next/` que pode ser servido por um servidor web como Nginx

5. Configure o Nginx:
   ```
   server {
       listen 80;
       server_name frontend.seu_dominio.com;

       root /caminho/para/4studio/4studio-frontend/.next;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

#### Opção 3: Deploy no GitHub Pages

1. Certifique-se de que as configurações do seu repositório estão corretas:
   - No GitHub, vá para Settings > Pages
   - Em "Source", selecione "GitHub Actions"

2. As configurações para GitHub Pages já estão incluídas no arquivo `next.config.ts` com:
   ```typescript
   output: 'export',
   basePath: isGithubActions ? `/${repo}` : '',
   assetPrefix: isGithubActions ? `/${repo}/` : '',
   ```

3. O workflow para deploy automático já está configurado em `.github/workflows/github-pages.yml`

4. Para testar o build localmente antes de fazer push:
   ```powershell
   cd 4studio-frontend
   npm run build
   # Verifique se a pasta 'out' foi criada com os arquivos estáticos
   ```
   
5. Para configurar a URL da API para produção:
   - Vá para Settings > Secrets and variables > Actions
   - Adicione um novo repositório secret chamado `NEXT_PUBLIC_API_URL` com a URL da sua API em produção

6. Depois de fazer push para a branch main, o workflow do GitHub Actions fará o deploy automaticamente.
   Você pode acompanhar o progresso na guia Actions do seu repositório.

7. O site estará disponível em `https://seu-usuario.github.io/4studio/`

8. **Nota:** Por ser um site estático no GitHub Pages, o frontend precisará comunicar-se com uma API externa.
   Certifique-se de que sua API backend está hospedada em algum lugar acessível publicamente e configure o CORS
   adequadamente para permitir requisições do seu domínio GitHub Pages.

## Deploy do Backend no Render.com (Alternativa Gratuita ao Heroku)

O Render.com é uma plataforma de hospedagem que oferece um plano gratuito para aplicações Django e é muito fácil de configurar.

### Preparação do Backend para Render

1. **Crie uma conta no Render**
   - Acesse [render.com](https://render.com) e crie uma conta gratuita

2. **Crie um novo Web Service**
   - Clique em "New" e escolha "Web Service"
   - Conecte-se ao seu repositório GitHub
   - Selecione o repositório `4studio`

3. **Configure o serviço**
   - Nome: `4studio-backend` ou similar
   - Ambiente: Python
   - Build Command: `pip install -r requirements.txt && python 4studio-backend/manage.py collectstatic --noinput`
   - Start Command: `cd 4studio-backend && gunicorn 4studio.wsgi --log-file -`
   - Selecione o plano gratuito

4. **Configure as variáveis de ambiente**
   - Adicione as seguintes variáveis de ambiente:
     - `PRODUCTION=true`
     - `SECRET_KEY=[sua-chave-secreta]`
     - `ALLOWED_HOSTS=.onrender.com,4studio-backend.onrender.com`
     - `CORS_ALLOWED_ORIGINS=https://gustavohn2017.github.io`
     - `DATABASE_URL=[seu-banco-de-dados]` (Pode usar o SQLite para testes iniciais ou configurar um PostgreSQL)
     - `DEBUG=False`

5. **Deploy**
   - Clique em "Create Web Service"
   - O deploy será iniciado automaticamente
   - Aguarde o processo de build e deploy terminar

### Atualizando o Frontend para usar o Backend no Render

1. **Adicione o Secret no GitHub**
   - No GitHub, vá para Settings > Secrets and Variables > Actions
   - Adicione um novo repositório secret chamado `NEXT_PUBLIC_API_URL` com o valor `https://4studio-backend.onrender.com/api`

2. **Force um novo deploy do frontend**
   - Faça uma pequena alteração no código ou dispare manualmente o workflow do GitHub Actions

3. **Verifique a integração**
   - Após o deploy, verifique se o frontend está se comunicando corretamente com o backend

## Deploy do Backend em Outras Plataformas

### Railway

1. Crie uma conta no [Railway](https://railway.app/)
2. Importe seu repositório GitHub
3. Configure o comando de build e start
4. Adicione as variáveis de ambiente necessárias

### PythonAnywhere (Alternativa gratuita)

1. Crie uma conta em [PythonAnywhere](https://www.pythonanywhere.com/)
2. Siga o tutorial deles para implantação de Django
3. Configure CORS para permitir requisições do seu domínio GitHub Pages

### DigitalOcean App Platform

1. Crie uma conta no [DigitalOcean](https://www.digitalocean.com/)
2. Crie um novo App na plataforma App Platform
3. Conecte ao repositório GitHub
4. Configure as variáveis de ambiente
5. O deploy será automático

## Manutenção

### Atualizações

1. Puxe as últimas mudanças:
   ```
   git pull origin main
   ```

2. Atualize as dependências:
   ```
   # Backend
   cd 4studio-backend
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate

   # Frontend
   cd ../4studio-frontend
   npm install
   npm run build
   ```

3. Reinicie os serviços:
   ```
   sudo systemctl restart 4studio
   sudo systemctl restart nginx
   ```

### Backup

1. Backup do banco de dados:
   ```
   pg_dump -U 4studio_user -h localhost -d 4studio_db > 4studio_backup_$(date +%Y%m%d).sql
   ```

2. Backup de arquivos de mídia:
   ```
   tar -zcvf media_backup_$(date +%Y%m%d).tar.gz /caminho/para/4studio/4studio-backend/media
   ```

## Solução de Problemas

### Verificação de Logs

- Django/Gunicorn: `sudo journalctl -u 4studio`
- Nginx: `sudo tail -f /var/log/nginx/error.log`

### Problemas Comuns

1. **Erro de Conexão com Banco de Dados**
   - Verifique credenciais no `.env`
   - Confirme que PostgreSQL está rodando: `sudo systemctl status postgresql`

2. **Arquivos Estáticos Não Aparecem**
   - Execute `python manage.py collectstatic`
   - Verifique permissões: `sudo chown -R www-data:www-data /caminho/para/4studio/4studio-backend/static`

3. **Erro 502 Bad Gateway**
   - Verifique se Gunicorn está rodando: `sudo systemctl status 4studio`
   - Verifique permissões do socket: `sudo chown www-data:www-data /caminho/para/4studio/4studio-backend/4studio.sock`
