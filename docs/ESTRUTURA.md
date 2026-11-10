# Estrutura

- `server/index.cjs`: servidor Node.js; serve exclusivamente `dist` e os endpoints `/api/`.
- `server/schema.sql`: esquema SQLite inicial, aplicado automaticamente na inicialização.
- `data/comprae.sqlite`: arquivo persistente criado pelo servidor, ignorado pelo Git.
- `dist/assets/scripts/app.js`: vitrine, checkout, conta, consulta de CEP e Central do Vendedor.
- `dist/assets/styles/main.css`: layout responsivo e animações com movimento reduzido.
- `dist/assets/branding/comprae-logo.png`: logo original enquadrada por CSS.
- `dist/assets/images/products/`: fotografias locais; fontes em `docs/IMAGENS.md`.
- `iniciar.ps1`: inicia o servidor no Windows usando Node.js 24 ou superior.
- `.vscode/tasks.json`: tarefa para iniciar site e banco pelo VS Code.
- `tests/backend.test.cjs`: valida API e persistência com banco temporário.
- `tests/database.browser.cjs`: valida os fluxos do usuário no navegador.

## Dados e autenticação

`users` guarda identidade e hash scrypt com salt individual. `addresses` guarda o endereço atual. `sessions` guarda hashes de tokens aleatórios, válidos por 7 dias, enviados ao navegador em cookie HttpOnly/SameSite. As rotas autenticadas obtêm o usuário pela sessão, sem aceitar um ID de usuário vindo do cliente.

`searches` guarda as últimas 50 buscas por conta. `orders` e `order_items` guardam cada pedido e uma cópia de preços/endereço; alterações posteriores não modificam o histórico. `products` fornece os preços usados no servidor. Pedidos são simulados, sem pagamento nem movimentação de estoque.

Carrinho e favoritos continuam no localStorage, separados por ID de conta. A preferência de CEP de visitantes fica em `comprae-guest-delivery`. Cadastros antigos sem senha não são usados como identidade autenticada.

A consulta ViaCEP é feita no navegador. Após a escolha, o endereço é enviado à API da loja e salvo na conta.

`coupons` guarda códigos, percentual, ativação, mínimo e validade. Os pedidos preservam subtotal e desconto em centavos, além do código e percentual aplicado. A migração para a versão 2 mantém pedidos anteriores com desconto zero. A cotação pública `POST /api/cart/quote` recebe `items` e `couponCode`; o checkout refaz a validação antes de salvar.
