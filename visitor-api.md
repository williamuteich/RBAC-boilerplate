# Visitor API Flow

Este projeto expõe a API e o painel admin. A tela de QR code/confirmação fica em outro projeto React e chama esta API.

Fluxo em dois passos:

1. Captura inicial quando o usuário entra no site React.
2. Confirmação quando o cliente escaneia o QR code na landing page React e essa tela chama esta API.

## 1. Captura inicial

Use esta rota quando o visitante entrar no site pela primeira vez ou quando você quiser atualizar os dados locais.

`POST /api/public/visitor`

Body esperado:

```json
{
  "visitorId": "uuid-ou-id-único",
  "gclid": "123abc",
  "utmSource": "google",
  "utmCampaign": "campanha-x",
  "ip": "200.10.10.10",
  "userAgent": "Mozilla/5.0..."
}
```

Observações:

- `visitorId` é obrigatório.
- Os demais campos são opcionais.
- A rota faz `upsert`, então cria ou atualiza o mesmo visitante.
- `converted` fica `false` por padrão nessa etapa.

## 2. Confirmação da visita

Use esta rota quando o cliente estiver na loja e escanear o QR code no projeto React externo.

`POST /api/public/visitor/confirm`

Body esperado:

```json
{
  "visitorId": "uuid-ou-id-único",
  "gclid": "123abc",
  "utmSource": "google",
  "utmCampaign": "campanha-x",
  "ip": "200.10.10.10",
  "userAgent": "Mozilla/5.0..."
}
```

Observações:

- Esta rota também aceita o mesmo payload da captura inicial.
- A implementação força `converted = true`.
- Se o localStorage existir, a página `/confirmar?vid=...` reaproveita os dados antigos.

## 3. Página do QR Code no React externo

A tela do React externo faz o seguinte:

- lê o localStorage em `visitor_tracking` ou `visitorTracking`
- se não encontrar, usa o `visitorId` vindo da URL ou gerado na primeira captura
- envia novamente os dados para `POST /api/public/visitor/confirm`

Exemplo de localStorage sugerido:

```json
{
  "visitorId": "uuid-ou-id-único",
  "gclid": "123abc",
  "utmSource": "google",
  "utmCampaign": "campanha-x",
  "ip": "200.10.10.10",
  "userAgent": "Mozilla/5.0..."
}
```

## 4. Leitura no admin

Para listar os registros no painel admin:

`GET /api/admin/visitantes`

Essa rota exige sessão de admin e permissão `visitantes:visualizar`.

## 5. Leitura por outra aplicação

Se outro projeto precisar consumir os dados:

`GET /api/private/visitor`

Headers:

```http
x-api-key: SUA_PRIVATE_API_KEY
```

Ou:

```http
Authorization: Bearer SUA_PRIVATE_API_KEY
```

## Fluxo recomendado no React externo

```ts
await fetch("/api/public/visitor", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(visitorData),
});
```

Depois, na tela do QR code do projeto React:

```ts
await fetch("/api/public/visitor/confirm", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(visitorDataFromLocalStorage),
});
```
