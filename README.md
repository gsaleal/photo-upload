# Photo Upload

Este projeto é uma API RESTful para upload de imagens, armazenando-as no Amazon S3 e registrando metadados no PostgreSQL.

## Configuração

Antes de executar o projeto, crie um arquivo `.env` na raiz do projeto e preencha as seguintes variáveis de ambiente:

```env
# Configuração do banco de dados PostgreSQL
PGHOST=
PGDATABASE=
PGUSER=
PGPASSWORD=
ENDPOINT_ID=

# Configuração do Amazon S3
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_REGION=
S3_BUCKET_NAME=
```

## Fluxo de Upload de Imagens

1. O cliente realiza uma requisição `POST /users` enviando a imagem.
2. A API recebe o arquivo e gera um nome único para ele.
3. O arquivo é enviado para um bucket S3 configurado nas variáveis de ambiente.
4. O link da imagem armazenada no S3 e seus metadados são salvos no PostgreSQL.
5. A API retorna um JSON contendo informações sobre a imagem armazenada.

## Testando a API

Para testar a API, foi utilizado o **REST Client**, uma extensão do VS Code que permite enviar requisições HTTP diretamente do editor. Arquivos `.http` com exemplos de requisições foram criados para facilitar os testes.

## Tecnologias Utilizadas

- **Node.js**
- **Fastify**
- **PostgreSQL**
- **Amazon S3**
- **REST Client** (para testes)

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute a aplicação:
   ```bash
   npm run dev
   ```

Agora sua API estará rodando e pronta para receber uploads de imagens!

