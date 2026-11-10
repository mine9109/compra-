# Rotas

## Loja

- `/` — página inicial
- `/produtos/` — catálogo
- `/categorias/` — categorias
- `/produto/<identificador>/` — detalhe do produto
- `/carrinho/` — sacola
- `/checkout/` — checkout demonstrativo
- `/conta/` — área do cliente

## Central do Vendedor

- `/vendedor/` — visão geral
- `/vendedor/?secao=anuncios` — anúncios enviados
- `/vendedor/?secao=novo` — cadastro de produto
- `/vendedor/?secao=novo&editar=<identificador>` — edição de anúncio
- `/vendedor/?secao=estoque` — gerenciamento de estoque
- `/vendedor/?secao=empresa` — perfil da loja, com descrição e foto

## Institucional

- `/sobre/`
- `/contato/`
- `/ajuda/`
- `/privacidade/`
- `/termos/`
- `/trocas/`
- `/entrega/` — informações sobre entrega e frete; o CEP é consultado e alterado no cabeçalho
- `/pagamento/`

## API do banco

- `POST /api/auth/register` — nome, e-mail, senha, CPF, data de nascimento e endereço; cria conta e sessão.
- `POST /api/auth/login` — e-mail e senha; inicia sessão.
- `POST /api/auth/logout` — encerra a sessão atual.
- `GET /api/me` — conta atual, endereço, buscas e pedidos; visitante recebe `user: null`.
- `PUT /api/me/address` — atualiza o endereço da conta autenticada.
- `GET /api/searches` — lista as buscas da conta.
- `POST /api/searches` — registra `{ "term": "luminária" }`.
- `DELETE /api/searches` — limpa o histórico da conta.
- `GET /api/orders` — lista os pedidos da conta.
- `POST /api/cart/quote` — cotação pública; recebe `items` com `id`/`qty` e `couponCode` opcional. Retorna subtotal, desconto, total e cupom validado.
- `POST /api/orders` — registra pedido simulado; recebe `requestId`, `recipient`, `address`, `items` com `id`/`qty` e `couponCode` opcional. O servidor calcula o preço e valida novamente o cupom.
- `GET /api/catalog/products` — anúncios ativos com estoque, incluindo descrição e foto pública da loja.
- `POST /api/seller/profile` — ativa ou atualiza o perfil do vendedor; recebe nome, e-mail, telefone, CNPJ opcional, descrição e foto JPG opcional.
- `GET /api/seller/products` — lista apenas os anúncios do vendedor conectado.
- `POST /api/seller/products` — publica um anúncio com foto, preço e estoque.
- `PUT /api/seller/products/<identificador>` — altera um anúncio do próprio vendedor.
- `PUT /api/seller/products/<identificador>/stock` — acrescenta unidades ao estoque do próprio vendedor.

As escritas exigem a mesma origem (`Origin`); rotas privadas exigem o cookie de sessão. O servidor não oferece CORS para outros sites.
